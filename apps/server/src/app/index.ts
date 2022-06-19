import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { environment } from '../environments/environment.prod';
import { COOKIE_NAME, __prod__ } from './constants';
import { askResolver } from './resolvers/ask';
import { bidResolver } from './resolvers/bid';
import { KeebResolver } from './resolvers/keeb';
import { saleResolver } from './resolvers/sale';
import { UserResolver } from './resolvers/user';
import { createUserLoader } from './utils/createUserLoader';

export const redis = new Redis({
  host: environment.redis_host,
  port: environment.redis_port,
  password: environment.password,
  username: environment.username,
});

export const main = async () => {
  // let retries = 5;
  // while (retries) {
  //   try {
  //     await createConnection({
  //       type: 'postgres',
  //       url: process.env['DATABASE_URL'],
  //       logging: true,
  //       // synchronize: true,
  //       migrations: [join(__dirname, './migrations/*')],
  //       entities: [User, Keeb, Ask, Bid, Sale],
  //     });
  //     break;
  //   } catch (err) {
  //     console.log(err);
  //     retries--;
  //     console.log(`retries left: ${retries}`);
  //     // wait 5 secs
  //     await new Promise((res) => setTimeout(res, 5000));
  //   }
  // }

  // conn.runMigrations();

  const app = express();

  const RedisStore = connectRedis(session);
  app.set('trust proxy', 1);
  app.use(
    cors({
      origin: environment.cors_origin,
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__, // cookie only works in https
        domain: __prod__ ? '.codeponder.com' : undefined,
      },
      saveUninitialized: false,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      secret: environment.secret,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        KeebResolver,
        bidResolver,
        askResolver,
        saleResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
    }),
    introspection: true,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  app.listen(parseInt(environment.port), () => {
    console.log('server started on localhost:4001');
  });
};

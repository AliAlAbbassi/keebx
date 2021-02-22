import 'dotenv-safe/config'
import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import express from 'express'
import { buildSchema } from 'type-graphql'
// import { createConnection } from 'typeorm'
import { HelloResolver } from './resolvers/hello'
import { MyContext } from './types'
import 'firebase/auth'
import 'firebase/firestore'
import admin from 'firebase-admin'
import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import session from 'express-session'
import { COOKIE_NAME, __prod__ } from './constants'
import { firebaseConfig } from './firebaseConfig'

const main = async () => {
  admin.initializeApp(firebaseConfig)

  const app = express()

  const RedisStore = connectRedis(session)
  const redis = new Redis(process.env.REDIS_URL)

  app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))
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
        sameSite: 'lax',
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: process.env.SECRET || '',
      resave: false,
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
    context: ({ res, req }): MyContext => ({
      req,
      res,
      redis,
    }),
  })

  apolloServer.applyMiddleware({ app, cors: false })

  app.listen(process.env.PORT, () => {
    console.log('Server running on localhost:4000')
  })
}

main()

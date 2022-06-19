import { DataSource } from 'typeorm';
import { Ask } from './entities/Ask';
import { Bid } from './entities/Bid';
import { Keeb } from './entities/Keeb';
import { Sale } from './entities/Sale';
import { User } from './entities/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env['DATABASE_URL'],
  synchronize: true,
  logging: true,
  entities: [Keeb, Ask, Bid, Sale, User],
  subscribers: [],
  migrations: [],
});

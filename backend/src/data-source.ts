import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.SQLITE_DB_PATH ?? 'data/sqlite.db',
  entities: [__dirname + '/entities/*.js'],
  migrations: [__dirname + '/migrations/*.js'],
  synchronize: false,
});

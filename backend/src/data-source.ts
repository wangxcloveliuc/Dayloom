import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './entities/user.entity';
import { DiaryEntry } from './entities/diary-entry.entity';
import { Media } from './entities/media.entity';
import { Theme } from './entities/theme.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.SQLITE_DB_PATH ?? 'data/sqlite.db',
  entities: [User, DiaryEntry, Media, Theme],
  migrations: [__dirname + '/migrations/*.js'],
  synchronize: false,
});

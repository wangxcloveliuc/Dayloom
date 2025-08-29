import { DataSource } from 'typeorm';
import { User } from './entity/user.entity';
import { DiaryEntry } from './entity/diary-entry.entity';
import { Media } from './entity/media.entity';
import { Theme } from './entity/theme.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'mylife.db',
  entities: [User, DiaryEntry, Media, Theme],
  synchronize: true,
  logging: true,
});

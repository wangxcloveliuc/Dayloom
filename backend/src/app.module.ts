import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { DiaryEntry } from './entities/diary-entry.entity';
import { Media } from './entities/media.entity';
import { Theme } from './entities/theme.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'sqlite',
        database: config.get<string>('SQLITE_DB_PATH') ?? 'data/sqlite.db',
        entities: [User, DiaryEntry, Media, Theme],
        synchronize: false,
        migrations: [__dirname + '/migrations/*.js'],
      }),
    }),
    TypeOrmModule.forFeature([User, DiaryEntry, Media, Theme]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

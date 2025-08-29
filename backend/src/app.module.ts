import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entity/user.entity';
import { DiaryEntry } from './entity/diary-entry.entity';
import { Media } from './entity/media.entity';
import { Theme } from './entity/theme.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mylife.db',
      entities: [User, DiaryEntry, Media, Theme],
      synchronize: true, // Auto-create tables in development
      logging: true, // Enable SQL logging for development
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

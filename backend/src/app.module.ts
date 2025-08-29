import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entity/user.entity';
import { DiaryEntry } from './entity/diary-entry.entity';
import { Media } from './entity/media.entity';
import { Theme } from './entity/theme.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get<string>('DATABASE_PATH') ?? 'mylife.db',
        entities: [User, DiaryEntry, Media, Theme],
        synchronize: configService.get<boolean>('TYPEORM_SYNC') ?? true,
        logging: configService.get<boolean>('TYPEORM_LOGGING') ?? true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

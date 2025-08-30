import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enable CORS for development front-end
  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:2002',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = app.get(ConfigService);
  const port = Number(config.get<number>('PORT') ?? 2001);
  app.enableCors({
    origin: config.get<string>('FRONTEND_ORIGIN') ?? 'http://localhost:2002',
  });
  await app.listen(port);
}

bootstrap();

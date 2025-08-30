import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3000;

  // Read ENABLE_CORS and FRONTEND_ORIGIN/CORS_ORIGIN from env
  const enableCors = configService.get<string | boolean>('ENABLE_CORS') ?? true;
  if (enableCors === true || enableCors === 'true') {
    const corsEnv =
      configService.get<string>('FRONTEND_ORIGIN') ?? configService.get<string>('CORS_ORIGIN') ?? '*';
    // Support comma-separated list of origins in env var
    const origins = corsEnv === '*' ? '*' : corsEnv.split(',').map((s) => s.trim());

    app.enableCors({
      origin: origins === '*' ? true : (origins as string[]),
      credentials: true,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
      exposedHeaders: ['Authorization'],
    });
  }

  await app.listen(port);
}

bootstrap();

import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Increase the request size limit
  const configService = app.get(ConfigService);

  app.use(
    json({ limit: configService.get<number>('MAX_BODY_SIZE_MB', 5) + 'mb' }),
  );
  app.use(
    urlencoded({
      extended: true,
      limit: configService.get<number>('MAX_BODY_SIZE_MB', 5) + 'mb',
    }),
  );
  const port = process.env.SERVICE_PORT || 3001;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();

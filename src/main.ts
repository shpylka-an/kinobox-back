import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

import { AppModule } from './app.module';

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}
bootstrap();

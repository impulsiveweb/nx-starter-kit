/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';



async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: "*",
      exposedHeaders: ["Authorization"],
    }
  });
  const globalPrefix = process.env.API_PREFIX || '';
  if(globalPrefix){
    app.setGlobalPrefix(globalPrefix);
  }
  const port = process.env.API_PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const PORT = 4200;
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  let cors = require('cors');
  app.use(cors());

  app.enableCors({
    origin:[
      'http://localhost:4201',  // Фронтенд в dev-режиме
    'http://frontend:4201' 
    ],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
  })

  app.setGlobalPrefix('/api');
  await app.listen(PORT, () => console.log(`Server started on ${PORT}`));
}
bootstrap();

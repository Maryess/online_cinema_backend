import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { PrometheusController } from '@willsoto/nestjs-prometheus';
import { register } from 'prom-client';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const PORT = 4200;
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  let cors = require('cors');

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.use(cors());

  app.enableCors({
    origin: ['http://localhost:4201', 'http://frontend:4201'],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });
  app.use('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  });
  app.setGlobalPrefix('/api');
  await app.listen(PORT, () => console.log(`Server started on ${PORT}`));
}
bootstrap();

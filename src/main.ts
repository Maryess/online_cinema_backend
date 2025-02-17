import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const PORT = 4200;
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  let cors = require('cors');
  app.use(cors());

  app.setGlobalPrefix('/api');
  await app.listen(PORT, () => console.log(`Server started on ${PORT}`));
}
bootstrap();

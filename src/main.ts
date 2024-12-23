import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = 4200;

  const app = await NestFactory.create(AppModule);
  let cors = require('cors');
  app.use(cors());

  app.setGlobalPrefix('/api');
  await app.listen(PORT, () => console.log(`Server started on ${PORT}`));
}
bootstrap();

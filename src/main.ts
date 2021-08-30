import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { handleErrors } from './error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  handleErrors(app as any);
  await app.listen(3001);
}
bootstrap();

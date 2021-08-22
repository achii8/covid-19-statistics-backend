import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from './exception-filter/validation-exception.filter';
import { HttpExceptionFilter } from './exception-filter/http-exception.filter';

export const handleErrors = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  return app;
};

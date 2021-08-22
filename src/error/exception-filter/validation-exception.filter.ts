import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  NotFoundException,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { Errors } from '../errors';

@Catch()
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let error = Errors.INTERNAL_SERVER_ERROR;
    switch (exception.constructor.name) {
      case NotFoundException.name:
        error = Errors.PATH_NOT_FOUND;
        break;
      case BadRequestException.name:
        error = Errors.INVALID_PARAMETERS;
        break;
      case UnauthorizedException.name:
        error = Errors.UNAUTHORIZED;
        break;
      default:
        error = Errors.INTERNAL_SERVER_ERROR;
        console.log(exception.message);
    }

    response.status(error.status).json({
      success: false,
      error: {
        code: error.code,
        status: error.status,
        cause: exception?.message,
      },
      session: ctx.getRequest().session,
    });
  }
}

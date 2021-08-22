import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { ThrowableError } from '../errors';

@Catch(ThrowableError)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: ThrowableError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const error = exception.error;
    response.status(error.status).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        cause: exception.cause,
      },
      session: ctx.getRequest().session,
    });
  }
}

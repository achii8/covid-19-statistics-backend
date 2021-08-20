import { HttpStatus } from '@nestjs/common/enums';

type ErrorType = {
  status: number;
  code: string;
  message?: string;
};

export class ThrowableError {
  public error: DefaultError;
  public cause?: any;

  constructor(error: DefaultError, cause?: any) {
    this.error = error;
    this.cause = cause;
  }
}

export class DefaultError {
  public status: number;
  public code: string;
  public message?: string;

  constructor(error: ErrorType) {
    this.status = error.status;
    this.code = error.code;
    this.message = error.message;
  }

  public throw(cause: any = null) {
    throw new ThrowableError(this, cause);
  }

  public build(error: any) {
    if (error.constructor.name === DefaultError.name) {
      return error;
    }
    return this;
  }

  public static build(error: ErrorType): DefaultError {
    return new DefaultError(error);
  }
}

export const Errors = {
  INTERNAL_SERVER_ERROR: DefaultError.build({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Server Error Happened!',
  }),
  MAXIMUM_TRIES_REACHED: DefaultError.build({
    status: HttpStatus.FORBIDDEN,
    code: 'MAXIMUM_TRIES_REACHED',
    message: 'Maximum tries reached!',
  }),
  USER_EXISTS: DefaultError.build({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    code: 'USER_EXISTS',
    message: 'The email you provided already exists',
  }),
  CLIENT_NAME_EXISTS: DefaultError.build({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    code: 'CLIENT_NAME_EXISTS',
    message: 'Client with this name already exists!',
  }),

  PATH_NOT_FOUND: DefaultError.build({
    status: HttpStatus.NOT_FOUND,
    code: 'PATH_NOT_FOUND',
    message: 'The path you provided does not exist',
  }),
  ENTITY_NOT_FOUND: DefaultError.build({
    status: HttpStatus.NOT_FOUND,
    code: 'ENTITY_NOT_FOUND',
    message: 'The requested entity does not exist',
  }),
  INVALID_PARAMETERS: DefaultError.build({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    code: 'INVALID_PARAMETER',
    message: 'invalid parameters',
  }),
  INVALID_PHONE_NUMBER: DefaultError.build({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    code: 'INVALID_PHONE_NUMBER',
    message: 'invalid phone number',
  }),
  INVALID_CREDENTIALS: DefaultError.build({
    status: HttpStatus.UNAUTHORIZED,
    code: 'INVALID_CREDENTIALS',
    message: 'invalid credentials',
  }),
  INVALID_ACTIVATION_TOKEN: DefaultError.build({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    code: 'INVALID_ACTIVATION_TOKEN',
    message: 'invalid activation token',
  }),
  UNAUTHORIZED: DefaultError.build({
    status: HttpStatus.UNAUTHORIZED,
    code: 'UNAUTHORIZED',
    message: 'unauthorized',
  }),
  INSUFFICIENT_PRIVILEGES: DefaultError.build({
    status: HttpStatus.FORBIDDEN,
    code: 'INSUFFICIENT_PRIVILEGES',
    message: 'you have no permissions to access this resource',
  }),
  PASSWORDS_DO_NOT_MATCH: DefaultError.build({
    status: HttpStatus.FORBIDDEN,
    code: 'PASSWORDS_DO_NOT_MATCH',
    message: 'provided passwords do not match',
  }),
};

export const FrontErrors = {
  SERVER_CONNECTION_PROBLEM: DefaultError.build({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    code: 'SERVER_CONNECTION_PROBLEM',
    message: 'Connection Problem',
  }),
  INVALID_RESPONSE: DefaultError.build({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    code: 'INVALID_RESPONSE',
    message: 'Invalid Response',
  }),
};

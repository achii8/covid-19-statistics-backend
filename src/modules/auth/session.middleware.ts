import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { ISession } from './session.interface';
import { AuthService } from './auth.service';

export interface ISessionRequest extends Request {
  session: ISession;
}

@Injectable()
export class ScopedRequestMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: ISessionRequest, res: Response, next: Function) {
    req.session = null;

    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return next();
    }
    const jwt = req.header('Authorization').split(' ')[1];
    if (jwt) {
      req.session = await this.authService.getSessionFromJwtToken(jwt);
    }
    next();
  }
}

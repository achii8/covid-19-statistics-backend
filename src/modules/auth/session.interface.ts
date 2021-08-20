import { UserModel } from '../db/entities/user.entity';

export interface ISession {
  user: UserModel;
}

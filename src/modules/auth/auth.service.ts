import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { ISession } from './session.interface';
import { Errors } from '../../error/errors';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { ConfigurationService } from '../config/configuration.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from '../db/entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigurationService,
  ) {}

  async validateUserByPassword(dto: LoginUserDto) {
    const hashedPassword = await hash(
      dto.password,
      this.configService.getConfig().config.PASSWORD_SALT,
    );
    const userToAttempt = await this.userRepository.findOne({
      email: dto.email,
      password: hashedPassword,
    });
    if (!userToAttempt) {
      throw new HttpException('entity not found', 404);
    }
    const response = await this.createJwtPayload(dto);
    return {
      token: response.token,
      userData: {
        firstName: userToAttempt.firstName,
        lastName: userToAttempt.lastName,
        email: userToAttempt.email,
      },
    };
  }

  async createJwtPayload(user: LoginUserDto) {
    const data: JwtPayload = {
      email: user.email,
    };
    const jwt = await this.jwtService.signAsync(data);
    const resp = this.jwtService.decode(jwt);
    return {
      token: jwt,
    };
  }

  async getUserSessionByMail(email) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      Errors.ENTITY_NOT_FOUND.throw();
    }
    return {
      user: user,
    };
  }
  async getSessionFromJwtToken(jwtToken: string): Promise<ISession> {
    const tokenInfo = this.jwtService.decode(jwtToken);
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      //#fixme
      const email = tokenInfo.email;
      const session = await this.getUserSessionByMail(email);
      return session as any;
    } catch {
      return {
        user: null,
      };
    }
  }
}

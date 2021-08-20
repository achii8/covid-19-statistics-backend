import {
  Controller,
  Get,
  Req,
  Patch,
  Post,
  Body,
  HttpException,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  createUser(@Body() userData: CreateUserDto) {
    if (this.validateEmail(userData.email)) {
      return this.userService.createUser(userData);
    }
    return {
      code: '401',
      error: 'INVALID CREDENTIALS',
    };
  }

  @Patch(':token')
  async confirmUser(@Param('token') token: string) {
    return await this.userService.confirmUser(token);
  }

  validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
}

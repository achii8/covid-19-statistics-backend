import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.validateUserByPassword(loginUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async testGuard() {
    console.log('welcome :)');
    return null;
  }
}

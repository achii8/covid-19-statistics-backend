import { Module } from '@nestjs/common';
import { DBModule } from '../db/db.module';
import { ConfigurationModule } from '../config/configuration.module';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigurationService } from '../config/configuration.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    DBModule,
    ConfigurationModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: async (config: ConfigurationService) => {
        return {
          signOptions: { expiresIn: '1d' },
          secret: config.getConfig().config.JWT_SECRET,
        };
      },
    }),
  ],
  exports: [AuthService, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DBModule } from '../db/db.module';
import { ConfigurationModule } from '../config/configuration.module';

@Module({
  imports: [
    DBModule,
    ConfigurationModule,
    // PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    // ConfigModule,
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

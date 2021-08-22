import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './modules/db/db.module';
import { ConfigurationModule } from './modules/config/configuration.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CountryModule } from './modules/country/country.module';
import { StatisticsModule } from './modules/statistics/statistics.module';

@Module({
  imports: [
    DBModule,
    ConfigurationModule,
    UserModule,
    AuthModule,
    CountryModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

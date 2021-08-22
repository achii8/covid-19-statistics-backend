import { HttpModule, Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { DBModule } from '../db/db.module';
import { ConfigurationModule } from '../config/configuration.module';
import { StatisticsModule } from '../statistics/statistics.module';

@Module({
  imports: [DBModule, ConfigurationModule, HttpModule],
  exports: [CountryService],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}

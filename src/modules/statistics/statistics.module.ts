import { HttpModule, Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { DBModule } from '../db/db.module';
import { ConfigurationModule } from '../config/configuration.module';
import { CountryModule } from '../country/country.module';

@Module({
  imports: [DBModule, ConfigurationModule, HttpModule, CountryModule],
  exports: [StatisticsService],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}

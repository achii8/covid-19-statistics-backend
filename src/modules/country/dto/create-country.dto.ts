import { countryName } from '../../db/entities/country.entity';
import { IsString, IsObject, IsOptional } from 'class-validator';
import { StatisticsModel } from '../../db/entities/statistics.entity';

export class CreateCountryDto {
  @IsString()
  code: string;

  @IsObject()
  name: countryName;

  @IsObject()
  @IsOptional()
  statistics: StatisticsModel;
}

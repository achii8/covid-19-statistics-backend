import { IsObject, IsString, IsOptional, IsNumber } from 'class-validator';
import { countryName } from '../../db/entities/country.entity';
import { StatisticsModel } from '../../db/entities/statistics.entity';

export class UpdateCountryDto {
  @IsString()
  @IsOptional()
  code?: string;

  @IsObject()
  @IsOptional()
  name?: countryName;

  @IsObject()
  @IsOptional()
  statistics?: StatisticsModel;
}

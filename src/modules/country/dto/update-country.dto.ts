import { IsObject, IsString, IsOptional, IsNumber } from 'class-validator';
import { countryName } from '../../db/entities/country.entity';

export class UpdateCountryDto {
  @IsString()
  @IsOptional()
  code?: string;

  @IsObject()
  @IsOptional()
  name?: countryName;

  @IsObject()
  @IsOptional()
  statistics?: any;
}

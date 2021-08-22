import { countryName } from '../../db/entities/country.entity';
import { IsString, IsObject } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  code: string;

  @IsObject()
  name: countryName;
}

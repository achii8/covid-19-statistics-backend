import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';

export class UpdateStatisticsDto {
  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsNumber()
  @IsOptional()
  confirmed?: number;

  @IsNumber()
  @IsOptional()
  recovered?: number;

  @IsNumber()
  @IsOptional()
  critical?: number;

  @IsNumber()
  @IsOptional()
  deaths?: number;

  @IsDateString()
  @IsOptional()
  lastChange?: Date;

  @IsDateString()
  @IsOptional()
  lastUpdate?: Date;

  @IsBoolean()
  @IsOptional()
  isRecent?: boolean;
}

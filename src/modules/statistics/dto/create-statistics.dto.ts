import { IsString, IsNumber, IsDateString, IsBoolean } from 'class-validator';

export class CreateStatisticsDto {
  @IsString()
  code: string;

  @IsString()
  country: string;

  @IsNumber()
  confirmed: number;

  @IsNumber()
  recovered: number;

  @IsNumber()
  critical: number;

  @IsNumber()
  deaths: number;

  @IsDateString()
  lastChange: Date;

  @IsDateString()
  lastUpdate: Date;

  @IsBoolean()
  isRecent: boolean;
}

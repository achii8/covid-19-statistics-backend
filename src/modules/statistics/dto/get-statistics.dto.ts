import { IsString, IsOptional } from 'class-validator';

export class GetStatisticsDto {
  @IsString()
  code: string;

  @IsString()
  @IsOptional()
  date?: string;
}

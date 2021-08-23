// @ts-ignore

import { IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';
export enum OrderByEnum {
  DEATH_ASC = 'DEATH_ASC',
  DEATH_DESC = 'DEATH_DESC',
  CONFIRMED_ASC = 'CONFIRMED_ASC',
  CONFIRMED_DESC = 'CONFIRMED_DESC',
  RECOVERED_ASC = 'RECOVERED_ASC',
  RECOVERED_DESC = 'RECOVERED_DESC',
  CRITICAL_ASC = 'CRITICAL_ASC',
  CRITICAL_DESC = 'CRITICAL_DESC',
}
export class StatisticsQueryDto {
  @IsEnum(OrderByEnum)
  @IsOptional()
  orderBy?: OrderByEnum;
}

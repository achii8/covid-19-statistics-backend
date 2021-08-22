import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { CreateStatisticsDto } from './dto/create-statistics.dto';
import { GetStatisticsDto } from './dto/get-statistics.dto';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}
  @Post()
  createStatistics(@Body() dto: CreateStatisticsDto) {
    return this.statisticsService.createOne(dto);
  }
  @Get()
  async getStatistics(query: GetStatisticsDto) {
    // const searchData = {
    //   code: query.code,
    // } as any;
    // if (query.date) {
    //   searchData.date = query.date;
    // }
    const resp = await this.statisticsService.fetchStatistics();
    // console.log('resp', resp);
    return resp;
  }
  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.statisticsService.getOne(id);
  }
}

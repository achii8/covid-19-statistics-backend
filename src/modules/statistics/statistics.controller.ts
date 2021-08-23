import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { CreateStatisticsDto } from './dto/create-statistics.dto';
import { UpdateStatisticsDto } from './dto/update-statistics.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createStatistics(@Body() dto: CreateStatisticsDto) {
    return this.statisticsService.createOne(dto);
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  async getStatistics() {
    return await this.statisticsService.list();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getStatistic(@Param('id') id: number) {
    return await this.statisticsService.getOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateStatistics(
    @Param('id') id: number,
    @Body() dto: UpdateStatisticsDto,
  ) {
    return await this.statisticsService.updateOne(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteStatistics(@Param('id') id: number) {
    return await this.statisticsService.deleteOne(id);
  }
}

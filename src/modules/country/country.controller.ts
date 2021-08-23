import {
  Controller,
  Post,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { UpdateCountryDto } from './dto/update-country.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StatisticsQueryDto } from './dto/statistics-query.dto';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  fetchCountries(@Query() query: StatisticsQueryDto) {
    return this.countryService.fetchAll(query);
  }

  @Patch(':code')
  @UseGuards(JwtAuthGuard)
  async updateCountry(
    @Param('code') code: string,
    @Body() dto: UpdateCountryDto,
  ) {
    return await this.countryService.updateOne(code, dto);
  }
}

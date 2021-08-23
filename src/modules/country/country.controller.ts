import {
  Controller,
  Post,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
  Delete,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { UpdateCountryDto } from './dto/update-country.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StatisticsQueryDto } from './dto/statistics-query.dto';
import { CreateCountryDto } from './dto/create-country.dto';
@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createCountry(@Body() dto: CreateCountryDto) {
    // return await this.countryService
    return await this.countryService.createOne(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  fetchCountries(@Query() query: StatisticsQueryDto) {
    return this.countryService.fetchAll(query);
  }

  @Get(':code')
  @UseGuards(JwtAuthGuard)
  async getCountryByCode(@Param() code: string) {
    return await this.countryService.getOne(code);
  }

  @Patch(':code')
  @UseGuards(JwtAuthGuard)
  async updateCountry(
    @Param('code') code: string,
    @Body() dto: UpdateCountryDto,
  ) {
    return await this.countryService.updateOne(code, dto);
  }

  @Delete(':code')
  @UseGuards(JwtAuthGuard)
  async deleteCountry(@Param('code') code: string) {
    return await this.countryService.deleteOne(code);
  }
}

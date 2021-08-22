import { Controller, Post, Get, Body, Patch, Param } from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  fetchCountries() {
    return this.countryService.fetchAll();
  }

  @Patch(':id')
  async updateCountry(@Param('id') id: number, @Body() dto: UpdateCountryDto) {
    return await this.countryService.updateOne(id, dto);
  }
}

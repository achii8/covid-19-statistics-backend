import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  OnModuleInit,
  HttpService,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { CountryModel } from '../db/entities/country.entity';
import { ConfigurationService } from '../config/configuration.service';
import { StatisticsService } from '../statistics/statistics.service';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Errors } from 'src/error/errors';

@Injectable()
export class CountryService implements OnModuleInit {
  constructor(
    @InjectRepository(CountryModel)
    private countryRepository: Repository<CountryModel>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigurationService,
  ) {}
  async onModuleInit(): Promise<void> {
    const countries = await this.countryRepository.find({});
    if (countries.length > 0) {
      return;
    }
    await this.httpService
      .get(this.configService.getConfig().api.COUNTRIES_LIST_API.toString())
      .toPromise()
      .then(async (res) => {
        console.log('res.data', res.data);
        for (const country of res.data) {
          await this.countryRepository.save({
            code: country.code,
            name: country.name,
          });
        }
      });
  }

  async fetchAll() {
    return await this.countryRepository.find({});
  }

  async getOne(code: string) {
    return await this.countryRepository.findOne({ code: code });
  }
  async updateOne(id: number, dto: UpdateCountryDto) {
    const foundCountry = await this.countryRepository.findOne(id);
    if (!foundCountry) {
      return Errors.ENTITY_NOT_FOUND.throw();
    }
    Object.assign(foundCountry, {
      ...{
        ...foundCountry,
        ...dto,
      },
    });
    console.log(foundCountry);
    return await this.countryRepository.save(foundCountry);
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  OnModuleInit,
  HttpService,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CountryModel } from '../db/entities/country.entity';
import { ConfigurationService } from '../config/configuration.service';
import { StatisticsService } from '../statistics/statistics.service';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Errors } from 'src/error/errors';
import { OrderByEnum, StatisticsQueryDto } from './dto/statistics-query.dto';
import { CreateCountryDto } from './dto/create-country.dto';

@Injectable()
export class CountryService implements OnModuleInit {
  constructor(
    @InjectRepository(CountryModel)
    private countryRepository: Repository<CountryModel>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigurationService,
    @Inject(forwardRef(() => StatisticsService))
    private readonly statisticsService: StatisticsService,
  ) {}
  async onModuleInit(): Promise<void> {
    const countries = await this.countryRepository.find({});
    if (countries.length === 0) {
      const response = await this.httpService
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
          console.log('here=');
          await this.statisticsService.getStatistics(res.data);
        });
    }
  }

  async createOne(dto: CreateCountryDto) {
    await this.countryRepository.save(dto);
  }

  async fetchAll(query: StatisticsQueryDto): Promise<Array<CountryModel>> {
    const orderBy: any = {};
    switch (query.orderBy) {
      case OrderByEnum.CONFIRMED_ASC:
        orderBy['confirmed'] = 'ASC';
        break;
      case OrderByEnum.CONFIRMED_DESC:
        orderBy['confirmed'] = 'DESC';
        break;
      case OrderByEnum.CRITICAL_ASC:
        orderBy['critical'] = 'ASC';
        break;
      case OrderByEnum.CRITICAL_DESC:
        orderBy['critical'] = 'DESC';
        break;
      case OrderByEnum.DEATH_ASC:
        orderBy['deaths'] = 'ASC';
        break;
      case OrderByEnum.DEATH_DESC:
        orderBy['deaths'] = 'DESC';
        break;
      case OrderByEnum.RECOVERED_ASC:
        orderBy['recovered'] = 'ASC';
        break;
      case OrderByEnum.RECOVERED_DESC:
        orderBy['recovered'] = 'DESC';
        break;
    }
    const response = await this.countryRepository
      .createQueryBuilder('country')
      .innerJoinAndSelect('country.statistics', 'statistics')
      .orderBy(orderBy)
      .getMany();
    return response;
  }

  async getOne(code: string) {
    return await this.countryRepository.findOne({ code: code });
  }

  async updateOne(code: string, dto: UpdateCountryDto) {
    const foundCountry = await this.countryRepository.findOne({ code: code });
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

  async deleteOne(code: string) {
    return await this.countryRepository.delete(code);
  }
}

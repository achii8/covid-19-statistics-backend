import { InjectRepository } from '@nestjs/typeorm';
import {
  forwardRef,
  HttpService,
  Inject,
  Injectable,
  Post,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConfigurationService } from '../config/configuration.service';
import { StatisticsModel } from '../db/entities/statistics.entity';
import { CreateStatisticsDto } from './dto/create-statistics.dto';
import { CountryService } from '../country/country.service';
import { CountryModel } from '../db/entities/country.entity';
import { Errors } from 'src/error/errors';
import { Cron } from '@nestjs/schedule';
import { UpdateStatisticsDto } from './dto/update-statistics.dto';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(StatisticsModel)
    private statisticsRepository: Repository<StatisticsModel>,
    private readonly configService: ConfigurationService,
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => CountryService))
    private readonly countryService: CountryService,
  ) {}

  async getStatistics(allCountries: CountryModel[], currentIndex?: number) {
    if (!currentIndex) {
      currentIndex = 0;
    }
    await this.httpService
      .get(this.configService.getConfig().api.COVID_STATISTICS_API, {
        headers: {
          'x-rapidapi-key':
            this.configService.getConfig().api.COVID_STATISTICS_API_KEY_HEADER,
          'x-rapidapi-host':
            this.configService.getConfig().api.COVID_STATISTICS_API_HOST_HEADER,
        },
        params: {
          code: allCountries[currentIndex].code,
        },
      })
      .toPromise()
      .then(async (response) => {
        const currentCountryUpdateTime =
          allCountries[currentIndex].statistics &&
          allCountries[currentIndex].statistics.lastUpdate
            ? new Date(
                allCountries[currentIndex].statistics.lastUpdate.toString(),
              ).toISOString()
            : null;
        const recentStatUpdateTime =
          response.data[0] && response.data[0].lastUpdate !== null
            ? new Date(response.data[0]?.lastUpdate.toString()).toISOString()
            : null;
        if (
          !currentCountryUpdateTime ||
          !recentStatUpdateTime ||
          currentCountryUpdateTime !== recentStatUpdateTime
        ) {
          if (response.data[0]) {
            const recentStatistic = response.data[0];
            const statistics = await this.statisticsRepository.save({
              code: recentStatistic.code,
              lastUpdate: recentStatistic.lastUpdate,
              recovered: recentStatistic.recovered,
              lastChange: recentStatistic.lastChange,
              deaths: recentStatistic.deaths,
              critical: recentStatistic.critical,
              confirmed: recentStatistic.confirmed,
              country: recentStatistic.country,
            });
            await this.countryService.updateOne(
              allCountries[currentIndex].code,
              {
                statistics: statistics,
              },
            );
          }
        }
        return response.data;
      });
    if (allCountries.length - 1 > currentIndex) {
      setTimeout(async () => {
        await this.getStatistics(allCountries, ++currentIndex);
      }, 2000);
    }
  }

  @Cron('0 28 * * * *')
  async fetchStatistics() {
    const allCountries = await this.countryService.fetchAll({});
    await this.getStatistics(allCountries);
    return null;
  }

  async list() {
    return await this.statisticsRepository.find({});
  }

  async createOne(dto: CreateStatisticsDto) {
    return await this.statisticsRepository.save(dto);
  }

  async getOne(id: number) {
    return await this.statisticsRepository.findOne(id);
  }

  async updateOne(id: number, dto: UpdateStatisticsDto) {
    const found = await this.statisticsRepository.findOne(id);
    if (!found) {
      return Errors.ENTITY_NOT_FOUND.throw();
    }
    Object.assign(found, {
      ...{
        ...found,
        ...dto,
      },
    });
    return await this.statisticsRepository.save(found);
  }

  async deleteOne(id: number) {
    return await this.statisticsRepository.delete(id);
  }
}

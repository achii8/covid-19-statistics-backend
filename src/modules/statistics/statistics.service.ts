import { InjectRepository } from '@nestjs/typeorm';
import { HttpService, Injectable, Post } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConfigurationService } from '../config/configuration.service';
import { StatisticsModel } from '../db/entities/statistics.entity';
import { CreateStatisticsDto } from './dto/create-statistics.dto';
import { GetStatisticsDto } from './dto/get-statistics.dto';
import { CountryService } from '../country/country.service';
import { Observable } from 'rxjs';
import { timer } from 'rxjs';
import { take, delay, observeOn, } from 'rxjs/operators';
import { interval, } from 'rxjs';
import {  of, asyncScheduler, scheduled } from 'rxjs';


@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(StatisticsModel)
    private statisticsRepository: Repository<StatisticsModel>,
    private readonly configService: ConfigurationService,
    private readonly httpService: HttpService,
    private readonly countryService: CountryService,
  ) {}

  async getStatistics(query: GetStatisticsDto) {
    const resp = await this.httpService
      .get(this.configService.getConfig().api.COVID_STATISTICS_API, {
        headers: {
          'x-rapidapi-key':
            this.configService.getConfig().api.COVID_STATISTICS_API_KEY_HEADER,
          'x-rapidapi-host':
            this.configService.getConfig().api.COVID_STATISTICS_API_HOST_HEADER,
        },
        params: {
          code: query.code,
        },
      })
      .toPromise()
      .then((resp) => {
        return resp.data;
      });
    return await this.createOne({
      code: resp[0].code,
      country: resp[0].country,
      confirmed: resp[0].confirmed,
      critical: resp[0].critical,
      deaths: resp[0].deaths,
      isRecent: true,
      lastChange: resp[0].lastChange,
      lastUpdate: resp[0].lastUpdate,
      recovered: resp[0].recovered,
    });
  }

  sleep = (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  async fetchStatistics() {
    const allCountries = await this.countryService.fetchAll();
    // const numbers = interval(1000);
    // await Promise.all(allCountries.map(async (country) => {
    //   const stat = await this.getStatistics({ code: country.code });
    //   console.log("omaga",stat)
    // })).then();
    // const task = () => console.log('it works!');



    // const api = 'https://reqres.in/api/users/';
    // const urls = [1, 2, 3].map(id => api + id);
    //
    // from(urls).pipe(
    //   mergeMap(url => mockHTTPRequest(url))
    // ).subscribe(val => consol.log(val));
    //
    // function mockHTTPRequest(url) {
    //   return of(`Response from ${url}`).pipe(
    //     // responses come in a random order
    //     delay(Math.random() * 1000)
    //   );

    // asyncScheduler.schedule(task, 2000);
    //
    // const observable = new Observable(function subscribe(subscriber) {
    //     const id = setInterval(() => {
    //       allCountries.forEach((country)=>{
    //         asyncScheduler.schedule(()=>{subscriber.next({code: country.code})}, 1000)
    //       })
    //     }, 1000);
    // });
    // observable.subscribe((query) => {
    //   console.log('query', query);
    //   // this.getStatistics(query as any)
    // });

    return null;
  }

  async createOne(dto: CreateStatisticsDto) {
    return await this.statisticsRepository.save(dto);
  }

  async getOne(id: number) {
    return await this.statisticsRepository.findOne(id);
  }
}

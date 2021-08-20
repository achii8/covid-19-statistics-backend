import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './configuration';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {}
  getConfig(): Configuration {
    return this.configService.get<Configuration>('env');
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationModule } from 'src/modules/config/configuration.module';
import { ConfigurationService } from 'src/modules/config/configuration.service';
import { UserModel } from './entities/user.entity';
import { StatisticsModel } from './entities/statistics.entity';
import { CountryModel } from './entities/country.entity';

const entities = [UserModel, StatisticsModel, CountryModel];

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: (configurationService: ConfigurationService) => {
        const config = configurationService.getConfig();
        return {
          type: 'mysql',
          host: config.database.host,
          port: config.database.port,
          username: config.database.username,
          password: config.database.password,
          database: config.database.dbName,
          entityPrefix: config.database.entityPrefix,
          entities: entities,
          synchronize: true,
          keepConnectionAlive: true,
        };
      },
    }),

    TypeOrmModule.forFeature(entities),
  ],
  exports: [TypeOrmModule],
})
export class DBModule {}

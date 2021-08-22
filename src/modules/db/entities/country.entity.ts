import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { StatisticsModel } from './statistics.entity';

export interface countryName {
  ka: string;
  en: string;
}
@Entity('country')
export class CountryModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({
    type: 'json',
  })
  name: countryName;

  @OneToOne(() => StatisticsModel, (statistics) => statistics.id)
  @JoinColumn()
  statistics: StatisticsModel;
}

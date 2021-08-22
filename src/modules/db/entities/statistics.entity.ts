import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('statistics')
export class StatisticsModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  country: string;

  @Column()
  confirmed: number;

  @Column()
  recovered: number;

  @Column()
  critical: number;

  @Column()
  deaths: number;

  @Column()
  lastChange: Date;

  @Column()
  lastUpdate: Date;

  @Column()
  isRecent: boolean;
}

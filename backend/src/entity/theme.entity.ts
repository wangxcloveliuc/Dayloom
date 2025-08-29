import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('themes')
export class Theme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('json')
  properties: object;
}

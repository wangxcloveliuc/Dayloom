import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Theme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'simple-json', nullable: true })
  properties: Record<string, string> | null;
}

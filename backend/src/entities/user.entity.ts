import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { DiaryEntry } from './diary-entry.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  selectedTheme?: string;

  @OneToMany(() => DiaryEntry, (entry) => entry.user)
  entries: DiaryEntry[];
}

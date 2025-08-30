import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { DiaryEntry } from './diary-entry.entity';

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

@Entity()
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  type: MediaType;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @CreateDateColumn()
  uploadedAt: Date;

  @ManyToOne(() => DiaryEntry, (entry) => entry.media, { onDelete: 'CASCADE' })
  entry: DiaryEntry;
}

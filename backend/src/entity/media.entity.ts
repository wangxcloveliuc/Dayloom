import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO'
}

@Entity('media')
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: MediaType
  })
  type: MediaType;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @CreateDateColumn()
  uploadedAt: Date;

  @Column('uuid')
  entryId: string;

  @ManyToOne(() => require('./diary-entry.entity').DiaryEntry)
  @JoinColumn({ name: 'entryId' })
  diaryEntry: any;
}

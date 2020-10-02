import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PublicFile } from '../files/file.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  releaseDate: Date;

  @JoinColumn()
  @OneToOne(() => PublicFile, { eager: true, nullable: true })
  preview?: PublicFile;

  @JoinColumn()
  @OneToOne(() => PublicFile, { eager: true, nullable: true })
  videoFile?: string;

  @Column({ default: false })
  isPublished?: boolean;
}

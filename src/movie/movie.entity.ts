import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryColumn()
  id?: number;

  @Column()
  title: string;

  @Column({ unique: true })
  slug?: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  releaseDate: Date;

  @Column({ nullable: true })
  preview?: string;

  @Column({ nullable: true })
  videoUrl?: string;
}

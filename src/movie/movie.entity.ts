import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PublicFile } from '../files/file.entity';
import { Actor } from '../actors/actor.entity';

@Entity('movies')
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

  @ManyToMany(
    () => Actor,
    actor => actor.movies,
  )
  @JoinTable({
    name: 'actors_movies',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'actor_id', referencedColumnName: 'id' },
  })
  cast: Actor[];
}

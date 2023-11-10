import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Actor } from '../actors/actor.entity';
import { Director } from '../directors/director.entity';
import { User } from '../users/user.entity';

export enum Ratings {
  TVMA = 'TV-MA',
  TV14 = 'TV-14',
  TVPG = 'TV-PG',
  R = 'R',
  PG13 = 'PG-13',
}

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

  @Column({ type: 'date', name: 'release_date' })
  releaseDate: Date;

  @Column({ nullable: true })
  preview?: string;

  @Column({ nullable: true })
  videoFile?: string;

  @Column({ default: false, name: 'is_published' })
  isPublished?: boolean;

  isInList?: boolean;

  @ManyToMany(() => Actor, (actor) => actor.movies, { eager: false })
  @JoinTable({
    name: 'actors_movies',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'actor_id', referencedColumnName: 'id' },
  })
  cast: Actor[];

  @ManyToMany(() => Director, (director) => director.movies, { eager: false })
  @JoinTable({
    name: 'directors_movies',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'director_id', referencedColumnName: 'id' },
  })
  directors: Director[];

  @Column({
    type: 'enum',
    enum: Ratings,
  })
  rating: Ratings;

  @Column({
    type: 'int',
  })
  duration: number;

  @ManyToMany(() => User, (user) => user.movies)
  users: User[];
}

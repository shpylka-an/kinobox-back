import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Movie } from '../movie/movie.entity';

@Entity()
export class Director {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @ManyToMany(
    () => Movie,
    movie => movie.directors,
  )
  movies: Movie[];
}

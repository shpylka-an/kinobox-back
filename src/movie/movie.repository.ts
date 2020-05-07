import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Movie } from './movie.entity';

@Injectable()
@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  // public createOne(movie: Movie) {
  //   return this.create(movie);
  // }
}

import { Injectable } from '@nestjs/common';
import { MovieRepository } from './movie.repository';
import { Movie } from './movie.entity';
import slugify from 'slugify';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  create(movie: Movie) {
    movie.slug = slugify(movie.title, '_');
    return this.movieRepository.create(movie);
  }
}

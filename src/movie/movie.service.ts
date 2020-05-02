import { Injectable } from '@nestjs/common';
import { MovieRepository } from './movie.repository';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  create(createMovieDto: Movie) {
    return this.movieRepository.create(createMovieDto);
  }
}

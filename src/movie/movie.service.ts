import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Movie } from './movie.entity';
import { MovieRepository } from './movie.repository';
import { UpdateMovieFilesDto } from './dto/update-movie-files.dto';

@Injectable()
export class MovieService extends TypeOrmCrudService<Movie> {
  constructor(private readonly movieRepo: MovieRepository) {
    super(movieRepo);
  }

  async updateFiles(updateFilesDto: UpdateMovieFilesDto) {
    return this.movieRepo.updateFiles(updateFilesDto);
  }
}

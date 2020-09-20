import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Movie } from './movie.entity';
import { UpdateMovieFilesDto } from './dto/update-movie-files.dto';

@Injectable()
@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  async updateFiles(updateFilesDto: UpdateMovieFilesDto) {
    const { id, previewUrl, videoUrl } = updateFilesDto;
    return await this.update(id, { preview: previewUrl, videoUrl });
  }
}

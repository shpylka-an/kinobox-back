import { EntityRepository, Repository } from 'typeorm';
import { Movie } from './movie.entity';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  async updateFiles(id: number, preview, videoFile) {
    const movie = await this.findOne({id});
    return await this.update(id, {
      ...movie,
      preview,
      videoFile,
    });
  }
}

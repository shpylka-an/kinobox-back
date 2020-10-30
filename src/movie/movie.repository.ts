import { EntityRepository, Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Actor } from '../actors/actor.entity';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  async createNewMovie(movieData: Partial<CreateMovieDto>, actors?: Actor[]) {
    const movie = this.create(movieData);
    if (actors) {
      movie.cast = actors;
    }
    return await this.save(movie);
  }

  async updateFiles(id: number, preview, videoFile) {
    const movie = await this.findOne({ id });
    return await this.update(id, {
      ...movie,
      preview,
      videoFile,
    });
  }
}

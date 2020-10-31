import { EntityRepository, Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { AttributesDto } from './dto/create-movie.dto';
import { Actor } from '../actors/actor.entity';
import { Director } from '../directors/director.entity';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  async createNewMovie(
    attributes: AttributesDto,
    actors: Actor[],
    directors: Director[],
  ) {
    const movie = this.create(attributes);
    movie.cast = actors;
    movie.directors = directors;
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

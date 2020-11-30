import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Actor } from '../actors/actor.entity';
import { Director } from '../directors/director.entity';
import { UpdateMovieDto } from './dto/update-movie.dto';
import slugify from 'slugify';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  async createOne(
    movieData: CreateMovieDto & { slug: string },
    relationships: { actors: Actor[]; directors: Director[] },
  ): Promise<Movie> {
    const newMovie = new Movie();
    newMovie.title = movieData.title;
    newMovie.description = movieData.description;
    newMovie.releaseDate = movieData.releaseDate;
    newMovie.rating = movieData.rating;
    newMovie.duration = movieData.duration;
    newMovie.slug = movieData.slug;

    newMovie.cast = relationships.actors;
    newMovie.directors = relationships.directors;

    return this.save(newMovie);
  }

  async updateOne(
    id: number,
    movieData: UpdateMovieDto & { slug?: string },
    relationships: { actors?: Actor[]; directors?: Director[] },
  ): Promise<Movie> {
    const movie = await this.findOne(id);

    movie.title = movieData.title || movie.title;
    movie.description = movieData.description || movie.description;
    movie.slug =
      slugify(movie.title, { replacement: '_', lower: true }) || movie.slug;
    movie.releaseDate = movieData.releaseDate || movie.releaseDate;
    movie.rating = movieData.rating || movie.rating;
    movie.duration = movieData.duration || movie.duration;

    if (relationships.actors) {
      movie.cast = relationships.actors;
    }

    if (relationships.directors) {
      movie.directors = relationships.directors;
    }

    return this.save(movie);
  }

  async updateFiles(id: string, preview, videoFile): Promise<UpdateResult> {
    return this.update(id, {
      isPublished: true,
      preview,
      videoFile,
    });
  }
}

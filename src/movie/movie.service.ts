import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieRepository } from './movie.repository';
import { FilesService } from '../files/files.service';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ActorsService } from '../actors/actors.service';
import { DirectorsService } from '../directors/directors.service';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { UserService } from '../users/user.service';
import slugify from 'slugify';

@Injectable()
export class MovieService {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly filesService: FilesService,
    private readonly actorsService: ActorsService,
    private readonly directorsService: DirectorsService,
    private readonly userService: UserService,
  ) {}

  async findAll(page: number = 1): Promise<{ count: number; items: Movie[] }> {
    const [items, count] = await this.movieRepository.findAndCount({
      relations: ['cast', 'directors'],
      take: 10,
      skip: 10 * (page - 1),
      order: {
        id: 'ASC',
      },
    });

    return {
      items,
      count,
    };
  }

  async getMovie(id: string): Promise<Movie> {
    const foundMovie = this.movieRepository.findOne(id, {
      relations: ['cast', 'directors'],
    });

    if (!foundMovie) {
      throw new NotFoundException('Movie not found');
    }

    return foundMovie;
  }

  async create(movie: CreateMovieDto): Promise<Movie> {
    const actors = await this.actorsService.getActorsByIds(movie.actors);
    const directors = await this.directorsService.getDirectorsByIds(
      movie.directors,
    );

    const movieData = {
      ...movie,
      slug: slugify(movie.title, { replacement: '_', lower: true }),
    };

    return this.movieRepository.createOne(movieData, { actors, directors });
  }

  async update(id: number, attributes: UpdateMovieDto): Promise<Movie> {
    const movieData: UpdateMovieDto & { slug?: string } = {
      ...attributes,
    };

    if (attributes.title) {
      movieData.slug = slugify(attributes.title, {
        replacement: '_',
        lower: true,
      });
    }

    let actors = null;
    let directors = null;

    if (attributes.actors && attributes.actors.length > 0) {
      actors = await this.actorsService.getActorsByIds(attributes.actors);
    }

    if (attributes.directors && attributes.directors.length > 0) {
      directors = await this.directorsService.getDirectorsByIds(
        attributes.directors,
      );
    }

    return this.movieRepository.updateOne(id, movieData, { directors, actors });
  }

  async delete(id: string): Promise<Movie> {
    const movie = await this.getMovie(id);

    if (!movie) {
      throw new NotFoundException(`Movie with id = ${id} does not exist`);
    }

    await this.movieRepository.delete(id);
    return movie;
  }

  async uploadFiles(
    movieId: string,
    preview: Express.Multer.File,
    videoFile: Express.Multer.File,
  ) {
    const previewModel = await this.filesService.uploadPreview(preview);
    const videoFileModel = await this.filesService.uploadVideo(videoFile);

    await this.movieRepository.updateFiles(
      movieId,
      previewModel,
      videoFileModel,
    );

    return {
      preview: previewModel,
      videoFile: videoFileModel,
    };
  }

  async getSuggestedMovies() {
    const newReleases = await this.movieRepository.find({
      relations: ['cast', 'directors'],
      take: 20,
      where: {
        isPublished: true,
      },
      order: {
        releaseDate: 'DESC',
      },
    });

    const popularOnKinobox = await this.movieRepository.find({
      relations: ['cast', 'directors'],
      take: 20,
      where: {
        isPublished: true,
      },
      order: {
        id: 'ASC',
      },
    });

    const trendingNow = await this.movieRepository.find({
      relations: ['cast', 'directors'],
      take: 20,
      where: {
        isPublished: true,
      },
      order: {
        title: 'DESC',
      },
    });

    return [
      {
        name: 'New Releases',
        items: newReleases,
      },
      {
        name: 'Popular on Kinobox',
        items: popularOnKinobox,
      },
      {
        name: 'Trending now',
        items: trendingNow,
      },
    ];
  }

  async addMovieToList(userId: string, movieId: string) {
    const movie = await this.movieRepository.findOne(movieId);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return this.userService.addMovieToList(userId, movie);
  }

  async getList(userId: string) {
    const { list } = await this.userService.findOneById(+userId, {
      relations: ['list'],
    });
    return {
      list,
    };
  }
}

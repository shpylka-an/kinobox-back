import { Injectable } from '@nestjs/common';
import { DeleteResult, FindManyOptions, MoreThan } from 'typeorm';
import { MovieRepository } from './movie.repository';
import { FilesService } from '../files/files.service';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ActorsService } from '../actors/actors.service';
import { DirectorsService } from '../directors/directors.service';
import { UpdateMovieDto } from './dto/update-movie.dto';
import slugify from 'slugify';

@Injectable()
export class MovieService {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly filesService: FilesService,
    private readonly actorsService: ActorsService,
    private readonly directorsService: DirectorsService,
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

  async findOne(id: number): Promise<Movie> {
    return this.movieRepository.findOne(id);
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

  async delete(id: string): Promise<DeleteResult> {
    return await this.movieRepository.delete(id);
  }

  async uploadFiles(
    movieId: number,
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
}

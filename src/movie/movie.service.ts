import { Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { MovieRepository } from './movie.repository';
import { FilesService } from '../files/files.service';
import { Movie } from './movie.entity';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    private readonly movieRepo: MovieRepository,
    private readonly filesService: FilesService,
  ) {}

  async findAll(): Promise<Movie[]> {
    return await this.movieRepo.find();
  }

  async create(data: CreateMovieDto): Promise<Movie> {
    return await this.movieRepo.save(data);
  }

  async update(id: string, data: Partial<UpdateMovieDto>): Promise<UpdateResult> {
    return await this.movieRepo.update(id, data);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.movieRepo.delete(id);
  }

  async uploadFiles(
    movieId: number,
    preview: Express.Multer.File,
    videoFile: Express.Multer.File,
  ) {
    const previewModel = await this.filesService.uploadPreview(preview);
    const videoFileModel = await this.filesService.uploadVideo(videoFile);

    await this.movieRepo.updateFiles(movieId, previewModel, videoFileModel);

    return {
      preview: previewModel,
      videoFile: videoFileModel,
    };
  }
}

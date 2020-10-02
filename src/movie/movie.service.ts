import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Movie } from './movie.entity';
import { MovieRepository } from './movie.repository';
import { FilesService } from '../files/files.service';

@Injectable()
export class MovieService extends TypeOrmCrudService<Movie> {
  constructor(
    private readonly movieRepo: MovieRepository,
    private readonly filesService: FilesService,
  ) {
    super(movieRepo);
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

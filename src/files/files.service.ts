import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { FilesRepository } from './files.repository';

@Injectable()
export class FilesService {
  private readonly s3;

  constructor(
    private readonly configService: ConfigService,
    private readonly fileRepository: FilesRepository,
  ) {
    this.s3 = new S3();
  }

  async uploadPreview(preview: Express.Multer.File) {
    const uploadPreviewResult = await this.s3
      .upload({
        Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
        Body: preview.buffer,
        Key: `previews/${uuid()}-${preview.originalname}`,
      })
      .promise();

    const newPreview = this.fileRepository.create({
      key: uploadPreviewResult.Key,
      url: uploadPreviewResult.Location,
    });

    await this.fileRepository.save(newPreview);
    return newPreview;
  }

  async uploadVideo(movie: Express.Multer.File) {
    const uploadMovieResult = await this.s3
      .upload({
        Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
        Body: movie.buffer,
        Key: `movies/${uuid()}-${movie.originalname}`,
      })
      .promise();

    const newFile = await this.fileRepository.create({
      key: uploadMovieResult.Key,
      url: uploadMovieResult.Location,
    });

    await this.fileRepository.save(newFile);
    return newFile;
  }
}

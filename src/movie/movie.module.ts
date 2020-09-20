import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { S3UploadService } from './s3-upload.service';
import { MovieRepository } from './movie.repository';

@Module({
  providers: [MovieService, S3UploadService],
  exports: [MovieService],
  imports: [TypeOrmModule.forFeature([MovieRepository])],
  controllers: [MovieController],
})
export class MovieModule {}

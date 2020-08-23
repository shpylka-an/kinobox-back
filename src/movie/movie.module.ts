import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { S3UploadService } from './s3-upload.service';
import { Movie } from './movie.entity';

@Module({
  providers: [MovieService, S3UploadService],
  exports: [MovieService],
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MovieController],
})
export class MovieModule {}

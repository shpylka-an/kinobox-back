import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRepository } from './movie.repository';
import { S3UploadService } from './s3-upload.service';

@Module({
  providers: [MovieService, S3UploadService],
  imports: [TypeOrmModule.forFeature([MovieRepository])],
  controllers: [MovieController],
})
export class MovieModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MovieRepository } from './movie.repository';
import { FilesModule } from '../files/files.module';
import { ActorsModule } from '../actors/actors.module';

@Module({
  providers: [MovieService],
  imports: [
    TypeOrmModule.forFeature([MovieRepository]),
    FilesModule,
    ActorsModule,
  ],
  controllers: [MovieController],
})
export class MovieModule {}

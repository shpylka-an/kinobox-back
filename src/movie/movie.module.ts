import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../users/user.repository';
import { MovieRepository } from './movie.repository';

@Module({
  controllers: [MovieController],
  providers: [MovieService, MovieRepository],
  imports: [TypeOrmModule.forFeature([UserRepository])],
})
export class MovieModule {}

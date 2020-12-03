import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { Movie } from '../movie/movie.entity';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findOneByEmail(email: string) {
    return this.findOne({
      where: { email },
    });
  }

  async addMovieToList(userId: string, movie: Movie) {
    const user = await this.findOne(userId, {
      relations: ['list'],
    });
    user.movies.push(movie);
    await this.save(user);

    return user.movies;
  }
}

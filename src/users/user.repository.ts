import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { Movie } from '../movie/movie.entity';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findOneById(id: number) {
    return this.findOne({
      where: { id },
    });
  }

  findOneByEmail(email: string) {
    return this.findOne({
      where: { email },
    });
  }

  async addMovieToList(userId: string, movie: Movie) {
    const user = await this.findOne(userId, {
      relations: ['list'],
    });
    user.list.push(movie);
    await this.save(user);
    return user.list;
  }
}

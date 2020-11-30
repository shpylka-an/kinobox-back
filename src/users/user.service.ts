import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Movie } from '../movie/movie.entity';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async findAll(page: number, perPage: number): Promise<any> {
    const [data, count] = await this.userRepository.findAndCount({
      skip: perPage * (page - 1),
      take: perPage,
    });

    return {
      data,
      total: count,
      page,
      pageCount: Math.ceil(count / perPage),
    };
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneByEmail(email);
  }

  async findOneById(id: number, relations: FindOneOptions<User> = null): Promise<User> {
    return await this.userRepository.findOne(id, relations);
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async addMovieToList(userId: string, movie: Movie) {
    return this.userRepository.addMovieToList(userId, movie);
  }
}

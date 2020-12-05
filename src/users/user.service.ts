import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { FindOneOptions } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(search: string, options: IPaginationOptions) {
    const usersBuilder = this.userRepository.createQueryBuilder();

    if (search) {
      usersBuilder.where('LOWER(user.firstName) like LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    return paginate<User>(usersBuilder, options);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneByEmail(email);
  }

  async findOneById(
    id: number,
    relations: FindOneOptions<User> = null,
  ): Promise<User> {
    return await this.userRepository.findOne(id, relations);
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}

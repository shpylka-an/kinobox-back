import { BadRequestException, Injectable } from '@nestjs/common';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

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

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne(id, {
      relations: ['roles'],
    });
  }

  async create(user: User): Promise<User> {
    const userInDb = await this.userRepository.findOneByEmail(user.email);

    if (userInDb) {
      throw new BadRequestException('User already exists');
    }

    user.password = await bcrypt.hash(user.password, 12);

    return await this.userRepository.save(user);
  }
}

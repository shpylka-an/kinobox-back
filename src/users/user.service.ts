import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

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

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOneById(id);
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}

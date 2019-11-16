import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {username},
    });
  }

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}

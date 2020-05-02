import { EntityRepository, Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(User)
export class MovieRepository extends Repository<User> {
  //
}

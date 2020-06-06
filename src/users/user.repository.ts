import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public findOneById(id: number) {
    return this.findOne({
      where: { id },
    });
  }

  public findOneByEmail(email: string) {
    return this.findOne({
      where: { email },
    });
  }
}

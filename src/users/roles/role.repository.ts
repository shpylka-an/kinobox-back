import { EntityRepository, Repository } from 'typeorm';
import { Role } from './role.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  public getUserRoles(userId: number): Promise<Role[]> {
    return this.createQueryBuilder('role')
      .leftJoin('role.users', 'user')
      .where('user.id = :userId', { userId })
      .select('role.title')
      .getMany();
  }
}

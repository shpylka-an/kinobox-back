import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async getUserRoles(userId: number): Promise<string[]> {
    const roles = await this.roleRepository.getUserRoles(userId);
    return roles.map(role => role.title);
  }
}

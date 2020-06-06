import { Module } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role.service';

@Module({
  providers: [RoleService],
  exports: [RoleService],
  imports: [TypeOrmModule.forFeature([RoleRepository])],
})
export class RolesModule {}

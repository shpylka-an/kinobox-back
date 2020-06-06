import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { RolesModule } from './roles/roles.module';

@Module({
  providers: [UserService],
  exports: [UserService, UserModule],
  imports: [TypeOrmModule.forFeature([UserRepository]), RolesModule],
  controllers: [UserController],
})
export class UserModule {}

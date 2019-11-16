import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  providers: [UserService],
  exports: [UserService, UserModule],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}

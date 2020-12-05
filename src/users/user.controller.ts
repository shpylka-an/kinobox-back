import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Pagination } from 'nestjs-typeorm-paginate';
import { UserService } from './user.service';
import { CurrentUser } from './user.decorator';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(
    @Query('search') search: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;
    return this.userService.findAll(search, { page, limit });
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async currentUser(@CurrentUser() user): Promise<User> {
    return this.userService.findOneById(user.userId);
  }
}

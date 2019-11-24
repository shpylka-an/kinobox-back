import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async index(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    return await this.userService.findAll(page, perPage);
  }

  // @Get(':id')
  // show(@Param() id): Promise<User> {
  //   // return this.userService.
  // }
}

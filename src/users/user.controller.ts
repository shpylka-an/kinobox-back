import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CurrentUser } from './user.decorator';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async index(@Query('page') page: number, @Query('perPage') perPage: number) {
    return await this.userService.findAll(page, perPage);
  }

  @Post('current')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  currentUser(@CurrentUser() user): Promise<User> {
    return this.userService.findOneById(user.userId);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { Director } from './director.entity';
import { DirectorsService } from './directors.service';

@Controller('directors')
export class DirectorsController {
  constructor(private readonly directorsService: DirectorsService) {}

  @Post()
  async create(@Body() director: Director) {
    return this.directorsService.create(director);
  }
}

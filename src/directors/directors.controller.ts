import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Director } from './director.entity';
import { DirectorsService } from './directors.service';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('directors')
export class DirectorsController {
  constructor(private readonly directorsService: DirectorsService) {}

  @Post()
  create(@Body() director: Director) {
    return this.directorsService.create(director);
  }

  @Get()
  findAll(): Promise<Director[]> {
    return this.directorsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<Director> {
    return this.directorsService.findOne(id);
  }

  @Put('/:id')
  update(@Param('id') id, @Body() director: Director): Promise<UpdateResult> {
    return this.directorsService.update(id, director);
  }

  @Delete('/:id')
  remove(@Param('id') id): Promise<DeleteResult> {
    return this.directorsService.delete(id);
  }
}

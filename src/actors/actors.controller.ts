import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ActorsService } from './actors.service';
import { Actor } from './actor.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Post()
  create(@Body() actor: Actor) {
    return this.actorsService.create(actor);
  }

  @Get()
  findAll(): Promise<Actor[]> {
    return this.actorsService.findAll();
  }

  @Put('/:id')
  update(@Param('id') id, @Body() actor: Actor): Promise<UpdateResult> {
    return this.actorsService.update(id, actor);
  }

  @Delete('/:id')
  delete(@Param('id') id): Promise<DeleteResult> {
    return this.actorsService.delete(id);
  }
}

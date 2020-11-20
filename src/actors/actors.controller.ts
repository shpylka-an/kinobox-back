import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { Actor } from './actor.entity';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Post()
  async create(@Body() actor: Actor) {
    return this.actorsService.create(actor);
  }

  @Get()
  async findAll(): Promise<Actor[]> {
    return this.actorsService.findAll();
  }
}

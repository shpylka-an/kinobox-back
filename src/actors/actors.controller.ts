import { Body, Controller, Post } from '@nestjs/common';
import { Actor } from './actor.entity';
import { ActorsService } from './actors.service';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Post()
  async create(@Body() actor: Actor) {
    return this.actorsService.create(actor);
  }
}

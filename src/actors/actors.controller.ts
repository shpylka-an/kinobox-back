import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put, UseGuards,
} from '@nestjs/common';
import { ActorsService } from './actors.service';
import { Actor } from './actor.entity';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { JwtAuthGuard } from '../shared/jwt-auth.guard';

@Controller('actors')
@UseGuards(JwtAuthGuard)
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Post()
  create(@Body() actor: CreateActorDto): Promise<Actor> {
    return this.actorsService.create(actor);
  }

  @Get()
  findAll(): Promise<Actor[]> {
    return this.actorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Actor> {
    return this.actorsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() actor: UpdateActorDto,
  ): Promise<Actor> {
    return this.actorsService.update(+id, actor);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.actorsService.remove(+id);
  }
}

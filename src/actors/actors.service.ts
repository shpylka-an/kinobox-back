import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Actor } from './actor.entity';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorsRepository: Repository<Actor>,
  ) {}

  create(actor: CreateActorDto): Promise<Actor> {
    return this.actorsRepository.save(actor);
  }

  findByIds(ids: number[]): Promise<Actor[]> {
    return this.actorsRepository.find({ id: In(ids) });
  }

  findAll(): Promise<Actor[]> {
    return this.actorsRepository.find();
  }

  findOne(id: number): Promise<Actor> {
    return this.actorsRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const actor = await this.actorsRepository.findOne(id);

    if (!actor) {
      throw new NotFoundException('Actor not found');
    }

    await this.actorsRepository.delete(id);
  }

  async update(id: number, actorDto: UpdateActorDto): Promise<Actor> {
    const actor = await this.actorsRepository.findOne(id);

    if (!actor) {
      throw new NotFoundException('Actor not found');
    }

    await this.actorsRepository.update(id, actorDto);
    return this.actorsRepository.findOne(id);
  }
}

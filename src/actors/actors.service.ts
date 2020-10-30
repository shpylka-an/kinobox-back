import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Actor } from './actor.entity';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorsRepository: Repository<Actor>,
  ) {}

  async create(actor: Actor): Promise<Actor> {
    return await this.actorsRepository.save(actor);
  }

  async getActorsByIds(ids: number[]) {
    return this.actorsRepository.find({ id: In(ids) });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { Actor } from './actor.entity';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorsRepository: Repository<Actor>,
  ) {}

  create(actor: Actor): Promise<Actor> {
    return this.actorsRepository.save(actor);
  }

  getActorsByIds(ids: number[]): Promise<Actor[]> {
    return this.actorsRepository.find({ id: In(ids) });
  }

  findAll(): Promise<Actor[]> {
    return this.actorsRepository.find();
  }

  delete(id: string): Promise<DeleteResult> {
    return this.actorsRepository.delete(id);
  }

  update(id: string, actor: Actor): Promise<UpdateResult> {
    return this.actorsRepository.update(id, actor);
  }
}

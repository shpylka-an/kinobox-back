import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, UpdateResult } from 'typeorm';
import { Director } from './director.entity';

@Injectable()
export class DirectorsService {
  constructor(
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
  ) {}

  create(director: Director): Promise<Director> {
    return this.directorRepository.save(director);
  }

  getDirectorsByIds(ids: number[]): Promise<Director[]> {
    return this.directorRepository.find({ id: In(ids) });
  }

  findAll(): Promise<Director[]> {
    return this.directorRepository.find();
  }

  findOne(id: string): Promise<Director> {
    return this.directorRepository.findOne(id);
  }

  update(id: string, director: Director): Promise<UpdateResult> {
    return this.directorRepository.update(id, director);
  }

  delete(id: string) {
    return this.directorRepository.delete(id);
  }
}

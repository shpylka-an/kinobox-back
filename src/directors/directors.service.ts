import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Director } from './director.entity';

@Injectable()
export class DirectorsService {
  constructor(
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
  ) {}

  async create(director: Director): Promise<Director> {
    return await this.directorRepository.save(director);
  }

  async getDirectorsByIds(ids: number[]): Promise<Director[]> {
    return await this.directorRepository.find({ id: In(ids) });
  }
}

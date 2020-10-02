import { EntityRepository, Repository } from 'typeorm';
import { PublicFile } from './file.entity';

@EntityRepository(PublicFile)
export class FilesRepository extends Repository<PublicFile> {}

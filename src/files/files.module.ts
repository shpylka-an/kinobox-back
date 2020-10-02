import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesRepository } from './files.repository';
import { PublicFile } from './file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PublicFile, FilesRepository])],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}

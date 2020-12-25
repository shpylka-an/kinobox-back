import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesRepository } from './files.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FilesRepository])],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Director } from './director.entity';
import { DirectorsService } from './directors.service';
import { DirectorsController } from './directors.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Director])],
  providers: [DirectorsService],
  controllers: [DirectorsController],
  exports: [DirectorsService],
})
export class DirectorsModule {}

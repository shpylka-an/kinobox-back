import {
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../shared/jwt-auth.guard';
import { RolesGuard } from '../shared/roles.guard';
import { Roles } from '../shared/roles.decorator';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';

@Roles('admin')
@Crud({
  model: {
    type: Movie,
  },
})
@Controller('movies')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MovieController implements CrudController<Movie> {
  constructor(public readonly service: MovieService) {}

  @Post(':id/upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'preview', maxCount: 1 },
      { name: 'videoFile', maxCount: 1 },
    ]),
  )
  async upload(@UploadedFiles() files, @Param('id') id: number) {
    try {
      return await this.service.uploadFiles(
        id,
        files.preview[0],
        files.videoFile[0],
      );
    } catch (err) {
      throw new HttpException(
        'Error loading files',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

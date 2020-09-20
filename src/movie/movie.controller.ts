import { Controller, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { JwtAuthGuard } from '../shared/jwt-auth.guard';
import { RolesGuard } from '../shared/roles.guard';
import { Roles } from '../shared/roles.decorator';
import { MovieService } from './movie.service';
import { S3UploadService } from './s3-upload.service';
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
  constructor(
    public readonly service: MovieService,
    private readonly s3UploadService: S3UploadService,
  ) {}

  @Post(':id/upload')
  async upload(@Req() req, @Res() res, @Param('id') id) {
    try {
      const data = await this.s3UploadService.fileUpload(req, res, id);
      return res.json({ data });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }
}

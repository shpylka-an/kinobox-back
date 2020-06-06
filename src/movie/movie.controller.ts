import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieService } from './movie.service';
import { S3UploadService } from './s3-upload.service';
import { RolesGuard } from '../shared/roles.guard';
import { Roles } from '../shared/roles.decorator';
import { JwtAuthGuard } from '../shared/jwt-auth.guard';

@Controller('movies')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MovieController {
  constructor(
    private readonly moviesService: MovieService,
    private readonly s3UploadService: S3UploadService,
  ) {}

  @Post()
  @Roles('admin')
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Post('upload')
  async upload(@Req() req, @Res() res) {
    try {
      await this.s3UploadService.fileUpload(req, res);
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }
}

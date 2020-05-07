import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieService } from './movie.service';
import { S3UploadService } from './s3-upload.service';

@Controller('movies')
export class MovieController {
  constructor(
    private readonly moviesService: MovieService,
    private readonly s3UploadService: S3UploadService,
  ) {}

  @Post()
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

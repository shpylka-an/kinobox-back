import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../shared/jwt-auth.guard';
import { RolesGuard } from '../shared/roles.guard';
import { Roles } from '../shared/roles.decorator';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CurrentUser } from '../shared/user.decorator';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';

@Roles('admin')
@Controller('movies')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MovieController {
  constructor(public readonly movieService: MovieService) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    return await this.movieService.create(createMovieDto);
  }

  @Get()
  async findAll(
    @Query('search') search: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @CurrentUser() user,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.movieService.findAll(search, user.userId, { page, limit });
  }

  @Get('/suggested')
  async getSuggestedMovies() {
    return this.movieService.getSuggestedMovies();
  }

  @Post('/:id/add-to-list')
  async addMovieToMyList(@CurrentUser() user, @Param('id') id: string) {
    return this.movieService.addMovieToList(user.userId, id);
  }

  @Get('/list')
  async getMoviesFromList(@CurrentUser() user) {
    return this.movieService.getMoviesFromList(user.userId);
  }

  @Delete('/:id/remove-from-list')
  async removeMovieFromList(@CurrentUser() user, @Param('id') id: string) {
    return this.movieService.removeMovieFromList(user.userId, id);
  }

  @Get('/:id')
  async findOne(@Param('id') id): Promise<Movie> {
    return this.movieService.getMovie(id);
  }

  @Patch('/:id')
  async update(@Body() updateMovieDto: UpdateMovieDto, @Param('id') id) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.movieService.delete(id);
  }

  @Post('/:id/upload')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'preview', maxCount: 1 },
        { name: 'videoFile', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: 'public',
          filename: (req, file, cb) => {
            const directory = {
              preview: 'previews',
              videoFile: 'movies',
            };
            cb(
              null,
              `/${directory[file.fieldname]}/${uuid()}-${file.originalname}`,
            );
          },
        }),
      },
    ),
  )
  async upload(
    @UploadedFiles()
    files: { preview: Express.Multer.File[]; videoFile: Express.Multer.File[] },
    @Param('id') id: string,
  ) {
    return this.movieService.uploadFiles(
      id,
      files.preview[0],
      files.videoFile[0],
    );
  }
}

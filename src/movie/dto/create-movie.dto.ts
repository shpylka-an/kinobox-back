import { IsEnum, IsNotEmpty } from 'class-validator';
import { Ratings } from '../movie.entity';

export class CreateMovieDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  releaseDate: Date;

  actors: number[];

  @IsEnum(Ratings)
  rating: Ratings;
}

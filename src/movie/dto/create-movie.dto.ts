import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Ratings } from '../movie.entity';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsISO8601()
  releaseDate: Date;

  @IsNotEmpty()
  @IsEnum(Ratings)
  rating: Ratings;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsArray()
  actors: number[];

  @IsArray()
  directors: number[];
}

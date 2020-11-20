import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber, IsOptional,
  IsString,
} from 'class-validator';
import { Ratings } from '../movie.entity';

export class UpdateMovieDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsOptional()
  @IsISO8601()
  releaseDate: Date;

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(Ratings)
  rating: Ratings;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  duration: number;

  @IsArray()
  @IsOptional()
  actors: number[];

  @IsArray()
  @IsOptional()
  directors: number[];
}

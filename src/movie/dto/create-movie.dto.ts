import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  // @IsDateString()
  releaseDate: Date;
}

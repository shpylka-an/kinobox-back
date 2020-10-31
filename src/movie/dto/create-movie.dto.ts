import { IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Ratings } from '../movie.entity';

// tslint:disable:max-classes-per-file
export class AttributesDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  releaseDate: Date;

  @IsEnum(Ratings)
  rating: Ratings;
}

export class RelationshipsDto {
  actors: number[];
  directors: number[];
}

export class CreateMovieDto {
  @ValidateNested()
  @Type(() => AttributesDto)
  attributes: AttributesDto;

  @ValidateNested()
  @Type(() => RelationshipsDto)
  relationships: RelationshipsDto;
}

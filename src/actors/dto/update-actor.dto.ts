import { IsString, MaxLength } from 'class-validator';

export class UpdateActorDto {
  @IsString()
  @MaxLength(20)
  firstName: string;

  @IsString()
  @MaxLength(20)
  lastName: string;
}

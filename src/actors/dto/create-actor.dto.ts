import { IsString, MaxLength } from 'class-validator';

export class CreateActorDto {
  @IsString()
  @MaxLength(20)
  firstName: string;

  @IsString()
  @MaxLength(20)
  lastName: string;
}

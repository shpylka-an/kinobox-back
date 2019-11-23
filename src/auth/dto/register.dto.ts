import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @MinLength(4)
  @IsNotEmpty()
  readonly password: string;
}

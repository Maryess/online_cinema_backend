import { IsArray, IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;
  @MinLength(6, {
    message: 'Password cannot be less then 6 characters',
  })
  @IsString()
  password: string;
}

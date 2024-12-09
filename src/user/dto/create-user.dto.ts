import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(6, {
    message: 'Your name cannot be less then 6 characters',
  })
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6, {
    message: 'Password cannot be less then 6 characters',
  })
  @IsString()
  password: string;

  refreshToken: string;
  accessToken: string;

  createdAt: string;
  updatedAt: string;
}

import { IsArray, IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @MinLength(4, {
    message: 'Your name  cannot be less then 6 characters',
  })
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @MinLength(5, {
    message: 'Password cannot be less then 6 characters',
  })
  @IsString()
  password: string;

  // @IsArray()
  // favorites?:string[]
}

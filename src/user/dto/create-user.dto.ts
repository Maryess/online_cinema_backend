import { IsArray, IsEmail, IsString, MinLength } from 'class-validator';
import { Movie } from 'src/movie/entity/movie.entity';

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

  @IsArray()
  favorites:string[]

  @IsString()
  refreshToken:string;
  
}

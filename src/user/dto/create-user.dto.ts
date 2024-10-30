import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  id: number;
  name: string;
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  refreshToken: string;

  createdAt: string;
  updatedAt: string;
}

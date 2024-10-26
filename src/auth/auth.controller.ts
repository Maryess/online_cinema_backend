import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  auth(@Body() createUserDto: CreateUserDto) {
    return this.authService.auth(
      createUserDto.email,
      createUserDto.password,
      createUserDto.name,
    );
  }

  // @Get()
  // getPassword(): string {
  //   return this.authService.getHello();
  // }
}

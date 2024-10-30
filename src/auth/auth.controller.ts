import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(
      createUserDto.email,
      createUserDto.password,
      createUserDto.name,
    );
  }

  // @Post()
  // signIn(@Body() createUserDto: CreateUserDto) {
  //   return this.authService.signIn(
  //     createUserDto.email,
  //     createUserDto.password,
  //     createUserDto.name,
  //   );
  // }
}

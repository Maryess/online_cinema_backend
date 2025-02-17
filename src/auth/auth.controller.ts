import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('sign-up')
  signup(@Body() data: AuthDto) {
    return this.authService.register(data);
  }

  

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('sign-in')
  signin(@Body() data: AuthDto) {
    return this.authService.auth(data);
  }
 }

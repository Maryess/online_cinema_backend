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
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authService.auth(data);
  }
 }

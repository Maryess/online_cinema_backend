import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/create')
  create(): string {
    return this.authService.getHello();
  }

  @Get()
  getPassword(): string {
    return this.authService.getHello();
  }
}

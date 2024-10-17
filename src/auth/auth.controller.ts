import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post()
  create(): string {
    return;
  }

  @Get()
  getPassword(): string {
    return;
  }
}

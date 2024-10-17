import { Controller, Get } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserService } from './user.service';

const prisma = new PrismaClient();

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // createPassword():string{
  // }

  // @Post()
  // createName():string{
  // }

  @Get()
  getAllUsers(): string {
    return 'All users';
  }
}

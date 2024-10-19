import { Controller, Get } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserService } from './user.service';

const prisma = new PrismaClient();

interface User {
  email: string;
  password: string;
  name: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  createUser() {
    // req.body
    // const lowerCaseEmail = email.toLowerCase();
    // const lowerCasePassword = password.toLowerCase();
    // await prisma.user.create({
    //   data:{
    //     email:email
    //   }
    // })

    // const user = await this.prisma.user.create({
    //   data: {
    //     email: lowerCaseEmail,
    //     password: lowerCasePassword,
    //     name: name,
    //   },
    // });

    return this.UserService.createUser();
  }

  // @Post()
  // createName():string{
  // }

  @Get()
  getAllUsers(): string {
    return 'All users';
  }
}

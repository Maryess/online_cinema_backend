import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  getAllUser() {
    return this.UserService.getAllUser();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.UserService.createUser(
      createUserDto.email,
      createUserDto.password,
      createUserDto.name,
    );
  }
}

import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  @Delete()
  deleteUser(@Body() createUserDto: CreateUserDto) {
    return this.UserService.removeUser(createUserDto.id);
  }

  @Patch()
  updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.UserService.updateUser(
      updateUserDto.id,
      updateUserDto.changeName,
    );
  }
}

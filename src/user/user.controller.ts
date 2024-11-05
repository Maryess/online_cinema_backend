import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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
  createUser(@Body() data: CreateUserDto) {
    return this.UserService.createUser(data);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.UserService.removeUser(id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() data: UpdateUserDto) {
    return this.UserService.updateUser(id, data);
  }
}

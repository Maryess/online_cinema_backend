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
  deleteUser(@Param('id') id: string) {
    return this.UserService.removeUser(id);
  }

  @Delete()
  deleteAllUsers(){
    return this.UserService.deleteAllUsers()
  }

  @Post(':userId/favorites/:movieId')
  updateUser(@Param('userId') userId: string,
   @Param('movieId') movieId:string) {
    return this.UserService.addMovieToFavorites(userId,movieId);
  }
}

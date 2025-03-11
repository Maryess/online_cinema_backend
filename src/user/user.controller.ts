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
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('/user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  getAllUser() {
    return this.UserService.getAllUser();
  }

  @Get('profile')
  @Auth('admin')
  getUser(){
    return this.UserService.getUser()
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

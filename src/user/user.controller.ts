import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
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

  // @Get('profile')
  // @Auth('admin')
  // getUser(){
  //   return this.UserService.getUser()
  // }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.UserService.removeUser(id);
  }

  @Get(':id')
  getUserByID(@Param('id') id: string) {
    return this.UserService.getUserById(id);
  }

  @Get('favorites/:id')
  getAllFavoritesMovie(@Param('id') id:string){
    return this.UserService.getAllFavoritesMovies(id)
  }

  @Put(':id')
  updateAdminRole(@Param('id') id: string, @Body() admin:boolean) {
    return this.UserService.updateAdminRole(id);
  }

  @Put(':id')
  update(@Param('id') id:string, @Body() data:UpdateUserDto){
    return this.UserService.update(id, data)
  }

  @Delete()
  deleteAllUsers(){
    return this.UserService.deleteAllUsers()
  }

  @Put(':userId/favorites/:movieId')
  updateUser(@Param('userId') userId: string,
   @Param('movieId') movieId:string) {
    return this.UserService.addMovieToFavorites(userId,movieId);
  }
}

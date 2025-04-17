import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Movie } from 'src/movie/entity/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie> 
  ) {}

  
  async getAllUser(searchTerm?:string) {
    return this.userRepository.find({relations:{
      favorites:true
    }});
  }

  async getUserById(id:string){
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    
  }

  async removeUser(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      this.userRepository.delete({ id: id });
      return {
        message: 'User deleted',
        id: `${id}`,
      };
    } else {
      return {
        message: 'Error',
      };
    }
  }

  async addMovieToFavorites(userId: string, movieId: string){
    try{const user = await this.userRepository.findOneBy({id: userId});
    const movie = await this.movieRepository.findOneBy({id: movieId});
    if(!movie) {
      throw new Error('Movie not found')
    }
    if (!user.favorites) {
      user.favorites = [];
    }
    user.favorites.push(movie);
    
    return await this.userRepository.save(user);}
    catch(error){
      return {
        message:'User dont updated'
      }
    }
  }

  async getAllFavoritesMovies(userId:string){
    try{
      const user = await this.userRepository.findOne({where:{id:userId},
      relations:{
        favorites:true
      }})
      return {
        movies: user.favorites
      }
    }catch(error){
      return{
        message:'Error',
        error: error
      }
    }
  }

  async deleteAllUsers(){
  try{
    await this.userRepository.createQueryBuilder().delete().from(User).execute()
    return{
    message:'Users deleted'
    }
  }catch(error){
    return{
      message:error
    }
  }
  }

  async updateAdminRole(id:string){
    try{
     
      return await this.userRepository.update(id,{isAdmin:true})

      
    }catch(error){
      return {
        message:error
      }
    }
  }

  async update(userId:string, data:UpdateUserDto){
    try{
      const user = await this.userRepository.findOneBy({id:userId})

      return await this.userRepository.update(userId, {...data})
    }catch(error){
      return error
    }
  }
}

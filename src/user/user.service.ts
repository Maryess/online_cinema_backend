import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Movie } from 'src/movie/entity/movie.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie> 
  ) {}

  async createUser(user: CreateUserDto) {
    const { name, email, password, favorites:favoritesIds } = user;

    const favorites = await this.movieRepository.find({
      where: favoritesIds.map((id) => ({ id })),
    });

    const createUser = this.userRepository.create({ name, email, password,favorites});

    if (createUser) {
      return this.userRepository.save(createUser);
    }

   
  }

  async getAllUser() {
    return this.userRepository.find({relations:{
      favorites:true
    }});
  }

  async removeUser(id: string) {
    const user = this.userRepository.findOne({
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
    const user = await this.userRepository.findOneBy({id: userId});
    const movie = await this.movieRepository.findOneBy({id: movieId});
    if(!movie) {
      throw new Error('Movie not found')
    }
    if (!user.favorites) {
      user.favorites = [];
    }
    user.favorites.push(movie);
    
    return await this.userRepository.save(user);
}
}

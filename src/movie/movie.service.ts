import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { Actor } from 'src/actor/entity/actor.entity';
import { Genre } from 'src/genre/entity/genre.entity';
import { User } from 'src/user/entity/user.entity';
import { Rating } from 'src/rating/entity/rating.entity';

export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Actor)
    private readonly actorsRepository: Repository<Actor>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>
  ) {}

  async createMovie(movie:CreateMovieDto) {
    try{
      const {
        poster='',
        bigPoster='',
        name='',
        slug='', 
        deskription='',
        year=0,
        duration=0,
        country ='',
        videoUrl ='',
        actors:actorIds,
        genres:genreIds
       } = movie;
  
      const actors = await this.actorsRepository.find({
        where: actorIds.map((id) => ({ id })),
      });
  
      const genres = await this.genreRepository.find({
        where: genreIds.map((id)=>({id}))
      })
  
      const createMovie = await this.movieRepository.create({
        name:name,
        slug:slug,
        poster:poster,
        bigPoster:bigPoster,
        deskription:deskription,
        year:year,
        duration:duration,
        country:country,
        videoUrl:videoUrl,
        actors,
        genres
      });
      
      if(!createMovie){
        return false
      }
      return await this.movieRepository.save(createMovie);
    }catch{
      return {
        status:false
      }
    }
     
  }

  async removeMovie(movieId: string) {

    try {
      const movie = await this.movieRepository.findOne({ where: { id: movieId }, relations: ['genres', 'actors'] }); // relations: ['genres', 'actors']
      if (!movie) {
        return false; 
      }
      if(movie.actors.length && movie.genres.length === 0){
        await this.movieRepository.remove(movie)
        return true
      }else{

      await this.movieRepository.createQueryBuilder()
        .relation(Movie, 'genres')
        .of(movie)
        .remove(movie.genres);

      await this.movieRepository.createQueryBuilder()
        .relation(Movie, 'actors')
        .of(movie)
        .remove(movie.actors);

      await this.movieRepository.remove(movie);
      return true;}
    } catch (error) {
      console.error("Ошибка при удалении фильма:", error);
      return false;
    }
  }



  async updateRating(movieId, ratingId){
    const rating = await this.ratingRepository.findOneBy({id:ratingId})
    if(!rating){
      throw new Error ('Rating not found')
    }
    const movie = await this.movieRepository.findOneBy({id:movieId})
    if(!movie){
      throw new Error ('Movie not found')
    }

    movie.rating = rating
  }

  async getAllMovies() {
    try{ 
      return this.movieRepository.find({relations:{
        actors:true,
        genres:true,
        rating:true
      }});
    }catch{
      return {
        status:false
      }
    }
   
  }
}

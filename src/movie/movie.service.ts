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

    const createMovie = this.movieRepository.create({
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
    
    if(createMovie){
      return this.movieRepository.save(createMovie);
    }else{
      return {
        message:"Movie don't deleted"
      };
    }
  }

  async removeMovie(_id: string) {
    const movie = this.movieRepository.delete(_id);

    if (movie) {
      return {
        message:"Movie deleted",
      };

    } else {
      return {
        message:"Movie don't deleted"
      };
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
    return this.movieRepository.find({relations:{
      actors:true,
      genres:true,
      rating:true
    }});
  }
}

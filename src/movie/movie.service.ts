import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { Actor } from 'src/actor/entity/actor.entity';
import { Genre } from 'src/genre/entity/genre.entity';
import { User } from 'src/user/entity/user.entity';

export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Actor)
    private readonly actorsRepository: Repository<Actor>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
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
      rating =4,
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
      rating:rating,
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

  // async removeAllMovie() {
  //   return this.movieRepository.remove;
  // }

  // async updateMovieId(){
  //   let updateId = 0;
  //   const movie = this.movieRepository.find();
  //   (await movie).map((element)=>{
  //     if(element.id != 1){
  //       updateId = 1
  //       element.id = updateId
  //     }
  //   })
  //   return movie;
  
  // }

  // async updateMovie(id: number, movie: UpdateMovieDto) {
  //   const updateMovie = this.movieRepository.update(id, { ...movie });

  //   if (updateMovie) {
  //     return { message: 'Movie updated', id: `${id}` };
  //   } else {
  //     return 'Please,check validate on your fields';
  //   }
  // }

  async getAllMovies() {
    return this.movieRepository.find({relations:{
      actors:true,
      genres:true
    }});
  }

  // async getMovieId(id: number) {
  //   return this.movieRepository.findOne({ where: { id: id } });
  // }
}

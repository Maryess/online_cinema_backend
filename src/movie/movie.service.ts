import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';

export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async createMovie(movie:CreateMovieDto) {
     const {
      poster='',
      bigPoster='',
      name='', 
      deskription='',
      year=0,
      duration=0,
      country ='',
      videoUrl='',
      genres = [],
      actors = []
     } = movie;

    const createMovie = this.movieRepository.create({
      name:name,
      poster:poster,
      bigPoster:bigPoster,
      deskription:deskription,
      year:year,
      duration:duration,
      country:country,
      videoUrl:videoUrl,
      actors:[],
      genres:[]
    });
    

    if (createMovie) {
      return this.movieRepository.save(createMovie);
    } else {
      return 'Please,check validate on your fields';
    }
  }

  // async removeMovie(id: number) {
  //   const movie = this.movieRepository.delete(id);

  //   if (movie) {
  //     return 'Movie deleted';

  //   } else {
  //     return 'Please,check validate on your fields';
  //   }
  // }

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

  // async getAllMovies() {
  //   return this.movieRepository.find();
  // }

  // async getMovieId(id: number) {
  //   return this.movieRepository.findOne({ where: { id: id } });
  // }
}

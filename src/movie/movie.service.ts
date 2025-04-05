import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { Actor } from 'src/actor/entity/actor.entity';
import { Genre } from 'src/genre/entity/genre.entity';
import { User } from 'src/user/entity/user.entity';
import { Rating } from 'src/rating/entity/rating.entity';
import { NotFoundException } from '@nestjs/common';

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
  
      const actors = actorIds?   await this.actorsRepository.find({
        where: actorIds.map((id) => ({ id })),
      }) : [];
  
      const genres = genreIds? await this.genreRepository.find({
        where: genreIds.map((id)=>({id}))
      }):[];
  
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

  async update(id: string, dto: CreateMovieDto): Promise<Movie | null> {
    try {
      const {
        poster,
        bigPoster,
        name,
        slug,
        deskription,
        year,
        duration,
        country,
        videoUrl,
        actors: actorIds, // Массив ID актеров
        genres: genreIds, // Массив ID жанров
      } = dto;

      // 1. Находим фильм по ID
      const movie = await this.movieRepository.findOne({
        where: { id },
        relations: ['actors', 'genres'], // Load relations to correctly remove them
      });

      if (!movie) {
        return null; // Или выбросить ошибку, если фильм не найден
      }

      // 2. Обновляем основные свойства фильма
      const updateData: Partial<Movie> = {
        name,
        slug,
        poster,
        bigPoster,
        deskription,
        year,
        duration,
        country,
        videoUrl,
      };

      await this.movieRepository.update(id, updateData);

      // 3. Удаляем старые связи актеров (если есть новые actorIds или нужно очистить)
      if (actorIds !== undefined) { // Обновляем только если actorIds переданы
        await this.movieRepository
          .createQueryBuilder()
          .relation(Movie, 'actors')
          .of(id)
          .remove(movie.actors?.map((actor) => actor.id) || []);  // remove all actors
      }

      // 4. Добавляем новые связи актеров (если actorIds переданы)
      if (actorIds && actorIds.length > 0) {
        const actors = await this.actorsRepository.findByIds(actorIds); // Find actors by ID
        await this.movieRepository
          .createQueryBuilder()
          .relation(Movie, 'actors')
          .of(id)
          .add(actors);  // Add new actors
      }

      // 5. Обновляем жанры (аналогично актерам)
      if (genreIds !== undefined) {  // Обновляем только если genreIds переданы
        await this.movieRepository
          .createQueryBuilder()
          .relation(Movie, 'genres')
          .of(id)
          .remove(movie.genres?.map((genre) => genre.id) || []);  // remove all genres
      }

      if (genreIds && genreIds.length > 0) {
        const genres = await this.genreRepository.findByIds(genreIds);
        await this.movieRepository
          .createQueryBuilder()
          .relation(Movie, 'genres')
          .of(id)
          .add(genres);
      }

      // 6. Возвращаем обновленную сущность
      const updatedMovie = await this.movieRepository.findOne({
        where: { id },
        relations: ['actors', 'genres'],
      }); // Load relations
      return updatedMovie;
    } catch (error) {
      console.error("Error updating movie:", error); // Log the error
      throw error; // Re-throw the error
    }
  }
  async getPopularMovie () {
    try{

      let message = ''
      const findAll = await this.movieRepository.find()

      findAll.map((movie)=>{
       movie.countOpened === 0 ? message= 'not found': message ='found'

      })

      return{
        message
      }

    }catch{
      return{
        status:false
      }
    }
  }

  async getMoviesByGenre(genreSlug:string){
    const movie =  this.movieRepository.find({where:{
      
    }})
  }

  async getMovieBySlug(slug:string){
    try {
      const movie = await this.movieRepository.findOne({where:{slug: slug},
      relations:['actors', 'genres']
      });

      // if (!movie || movie.length === 0) { // Проверка на пустой массив
      //   return {
      //     message: 'movie not found',
      //   };
      // }

      return movie
    } catch (error) {
      console.error("Error fetching movie:", error); 
      return {
        status: false,
      };
    }
  }
}

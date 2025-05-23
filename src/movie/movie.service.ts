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

  async getAllMovies(searchTerm?:string) {

    const queryBuilder = this.movieRepository
    .createQueryBuilder('movie')
    .leftJoinAndSelect('movie.actors', 'actors')
    .leftJoinAndSelect('movie.genres', 'genres')
    .where('movie.deleted_at IS NULL')

    if(searchTerm){
      queryBuilder.andWhere(
        "to_tsvector('english', movie.name || ' ' || movie.slug) @@ plainto_tsquery('english', :searchTerm)",
        {searchTerm}
      )
    }

    try{ 
      const movies = queryBuilder.getMany();

      const newMovies = (await movies).sort((a,b)=>a.name.localeCompare(b.name))

      return newMovies
    }catch(error){
      return error
    }
   
  }

  async getPopularMovie(){

    const queryBuilder = this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.actors', 'actors')
      .leftJoinAndSelect('movie.genres', 'genres')
    .where('movie.deleted_at IS NULL')

    try{
  
      const movies = queryBuilder.getMany()
       
      const popularMovies = (await movies).sort((a,b)=> b.countOpened - a.countOpened)

      return popularMovies
    }catch(error){
      return error
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
        actors: actorIds, 
        genres: genreIds,
      } = dto;

      const movie = await this.movieRepository.findOne({
        where: { id },
        relations: ['actors', 'genres'], 
      });

      if (!movie) {
        return null; 
      }

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

      if (actorIds !== undefined) { 
        await this.movieRepository
          .createQueryBuilder()
          .relation(Movie, 'actors')
          .of(id)
          .remove(movie.actors?.map((actor) => actor.id) || []); 
      }

      if (actorIds && actorIds.length > 0) {
        const actors = await this.actorsRepository.findByIds(actorIds); 
        await this.movieRepository
          .createQueryBuilder()
          .relation(Movie, 'actors')
          .of(id)
          .add(actors); 
      }

      if (genreIds !== undefined) { 
        await this.movieRepository
          .createQueryBuilder()
          .relation(Movie, 'genres')
          .of(id)
          .remove(movie.genres?.map((genre) => genre.id) || []);  
      }

      if (genreIds && genreIds.length > 0) {
        const genres = await this.genreRepository.findByIds(genreIds);
        await this.movieRepository
          .createQueryBuilder()
          .relation(Movie, 'genres')
          .of(id)
          .add(genres);
      }

      const updatedMovie = await this.movieRepository.findOne({
        where: { id },
        relations: ['actors', 'genres'],
      }); 
      return updatedMovie;
    } catch (error) {
      console.error("Error updating movie:", error); 
      throw error; 
    }
  }

  async getMovieBySlug(slug:string){
    try {
      const movie = await this.movieRepository.findOne({where:{slug: slug},
      relations:['actors', 'genres']
      });

      const updateData = {
        countOpened: movie.countOpened + 1
      }

      await this.movieRepository.update(movie.id, updateData)

      return movie
    } catch (error) {
      console.error("Error fetching movie:", error); 
      return {
        status: false,
      };
    }
  }
}

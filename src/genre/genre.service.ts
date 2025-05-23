import { InjectRepository } from '@nestjs/typeorm';
import { RelationId, Repository } from 'typeorm';
import { Genre } from './entity/genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Movie } from 'src/movie/entity/movie.entity';


export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>
  ) {}

  async createGenre(Genre: CreateGenreDto) {
    try{
      const { name='',slug='',movies:movieIds} = Genre;

      const createGenre = await this.genreRepository.create({
        name: name,
        slug:slug,
      });
  
      if(!createGenre){
        return {
          status:false
        }
      }

      return {
        data: await this.genreRepository.save(createGenre),
        status:true
      }
    }catch{
      return {status:false}
    }
  
  }

  async genGenreById(genreId:string){
    try{
      const genre = await this.genreRepository.find({where:{
        id:genreId
      }})

      return genre
    }catch(error){
      return {
        error: error
      }
    }
  }

  async getGenreBySlug(slug:string){
    try {
      const genre = await this.genreRepository.findOne({where:{slug: slug},
      relations:['movies']
      });

      return genre
    } catch (error) {
      console.error("Error fetching actor:", error); 
      return error
    }
  }

  async getAllGenres(searchTerm?:string) {
    const queryBuilder = this.genreRepository
      .createQueryBuilder('genre')
      .leftJoinAndSelect('genre.movies', 'movies')
      .where('genre.deleted_at IS NULL');

    if (searchTerm) {
      queryBuilder.andWhere(
        "to_tsvector('english', genre.name || ' ' || genre.slug ) @@ plainto_tsquery('english', :searchTerm)",
        { searchTerm },
      );
    }

    try {
      const genres = await queryBuilder.getMany();

      const newGenres = genres.sort((a,b)=>a.name.localeCompare(b.name))

      return newGenres;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }
  }

  async updateGenre(genreId:string, data:UpdateGenreDto){
    try{
      const genre = await this.genreRepository.find({where:{
        id:genreId
      }})

     const newGenre =  await this.genreRepository.update(genreId, {...data})
      return newGenre
    }catch(error){
      return {
        error: error
      }
    }
  }

  async deleteGenreById(genreID:string){
    try {
      const genre =await this.genreRepository.findOneBy({id:genreID});
      if(!genre){
        return false
      }
      // await this.movieRepository.delete({genres: genre});
      await this.genreRepository.remove(genre)
      return true
    }catch(error){
      return error
    }
  }

  async deleteAllGenres(){
    try{

      const genres = await this.genreRepository.find()

      for(const genre of genres){
        await this.genreRepository
        .createQueryBuilder()
        .relation(Genre, 'movies') 
        .of(genres)
        .remove(genre.movies);
      }
         await this.genreRepository.remove(genres)
         return{
          message:'Genres deleted'
         }
        }catch(error){
          return{
            message:error
          }
        }
  }
}

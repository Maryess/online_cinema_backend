import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './entity/genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Movie } from 'src/movie/entity/movie.entity';


export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>
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

  async getAllGenres() {
    try{
      const genres = await this.genreRepository.find()

      if(!genres){
        return false
      }

      return genres
    }catch{
      return {
        status:false
      }
    }
  }

  async deleteGenreById(genreID:string){
    try {
      const genre = await this.genreRepository.findOne({where:{id:genreID}})
      if(!genre){
        return false
      }

      await this.genreRepository.remove(genre)
      return true
    }catch{
      return false
    }
  }
}

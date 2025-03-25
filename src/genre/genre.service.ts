import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './entity/genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';


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

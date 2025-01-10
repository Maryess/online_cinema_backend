import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './entity/genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';


export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly GenreRepository: Repository<Genre>,
  ) {}

  async createGenre(Genre: CreateGenreDto) {
    const { name, deskription } = Genre;

    const createGenre = this.GenreRepository.create({
      name: name,
      deskription:deskription
    });

    if (createGenre) {
      return this.GenreRepository.save(createGenre);
    } else {
      return 'Please,check validate on your fields';
    }
  }

  async removeGenre(id: number) {
    const Genre = this.GenreRepository.delete(id);

    if (Genre) {
      return 'Genre deleted';

    } else {
      return 'Please,check validate on your fields';
    }
  }

  async removeAllGenre() {
    return this.GenreRepository.remove;
  }

  // async updateGenreId(){
  //   let updateId = 0;
  //   const Genre = this.GenreRepository.find();
  //   (await Genre).map((element)=>{
  //     if(element.id != 1){
  //       updateId = 1
  //       element.id = updateId
  //     }
  //   })
  //   return Genre;
  
  // }

//   async updateGenre(id: number, Genre: UpdateGenreDto) {
//     const updateGenre = this.GenreRepository.update(id, { ...Genre });

//     if (updateGenre) {
//       return { message: 'Genre updated', id: `${id}` };
//     } else {
//       return 'Please,check validate on your fields';
//     }
//   }

  async getAllGenres() {
    return this.GenreRepository.find();
  }

  async getGenreId(id: number) {
    return this.GenreRepository.findOne({ where: { id: id } });
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './entity/genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Movie } from 'src/movie/entity/movie.entity';


export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async createGenre(Genre: CreateGenreDto) {
    const { name='',slug='',movies:movieIds} = Genre;

    // const movies = await this.movieRepository.find({where: movieIds.map(id=>({id}))}) 

    const createGenre = this.genreRepository.create({
      name: name,
      slug:slug,
      // movies
    });

    if (createGenre) {
      return this.genreRepository.save(createGenre);
    } else {
      return 'Please,check validate on your fields';
    }
  }

  // async removeGenre(_id: string) {
  //   const Genre = this.genreRepository.delete({id:_id});

  //   if (Genre) {
  //     return 'Genre deleted';

  //   } else {
  //     return 'Please,check validate on your fields';
  //   }
  // }

  // async removeAllGenre() {
  //   return this.genreRepository.remove;
  // }

  // async updateGenreId(){
  //   let updateId = 0;
  //   const Genre = this.genreRepository.find();
  //   (await Genre).map((element)=>{
  //     if(element.id != 1){
  //       updateId = 1
  //       element.id = updateId
  //     }
  //   })
  //   return Genre;
  
  // }

//   async updateGenre(id: number, Genre: UpdateGenreDto) {
//     const updateGenre = this.genreRepository.update(id, { ...Genre });

//     if (updateGenre) {
//       return { message: 'Genre updated', id: `${id}` };
//     } else {
//       return 'Please,check validate on your fields';
//     }
//   }

  async getAllGenres() {
    return this.genreRepository.find();
  }

  // async getGenreId(_id: string) {
  //   return this.genreRepository.findOne({ where: { id: _id } });
  // }
}

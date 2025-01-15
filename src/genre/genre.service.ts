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

    const createGenre = this.genreRepository.create({
      name: name,
      slug:slug,
    });

    if (createGenre) {
      return this.genreRepository.save(createGenre);
    } else {
      return 'Please,check validate on your fields';
    }
  }

  async getAllGenres() {
    return this.genreRepository.find();
  }
}

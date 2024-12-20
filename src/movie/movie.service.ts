import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';

export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async createMovie(movie: Movie) {
    const createMovie = this.movieRepository.create(movie);
    if (createMovie) {
      return this.movieRepository.save(createMovie);
    } else {
      return 'Please,check validate on your fields';
    }
  }

  async removeMovie(id: number) {
    const movie = this.movieRepository.delete({ id: id });

    if (movie) {
      return 'Movie deleted';
    } else {
      return 'Please,check validate on your fields';
    }
  }

  async removeAllMovie() {
    const movie = this.movieRepository.find();
  }

  async updateMovie(id: number, movie: UpdateMovieDto) {
    const updateMovie = this.movieRepository.update(id, { ...movie });

    if (updateMovie) {
      return { message: 'Movie updated', id: `${id}` };
    } else {
      return 'Please,check validate on your fields';
    }
  }

  async getAllMovies() {
    return this.movieRepository.find();
  }

  async getMovieId(id: number) {
    return this.movieRepository.findOne({ where: { id: id } });
  }
}

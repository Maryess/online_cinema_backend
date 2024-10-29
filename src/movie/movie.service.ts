import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entity/movie.entity';

export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async createMovie(name: string): Promise<Movie | string> {
    const evaluation: number = 0;

    const movie = this.movieRepository.create({ name, evaluation });
    if (movie) {
      return this.movieRepository.save(movie);
    } else {
      return 'Please,check validate on your fields';
    }
  }

  async removeMovie(id: number) {
    const movie = this.movieRepository.delete({ id: id });

    if (movie) {
      return 'Movie delete';
    } else {
      return 'Please,check validate on your fields';
    }
  }

  async removeAllMovie() {
    const movie = this.movieRepository.find();
  }

  async updateMovie(id: number, changeName: string) {
    const movie = this.movieRepository.update(id, { name: changeName });

    if (movie) {
      return 'Movie updated';
    } else {
      return 'Please,check validate on your fields';
    }
  }

  async getAllMovies() {
    return this.movieRepository.find();
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../entity/movie.entity';

export class EvaluationService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async updateEvaluating(id: number, updateEvaluating: number) {
    const movie = this.movieRepository.update(id, {
      evaluation: updateEvaluating,
    });

    if (movie) {
      return 'Evaluation in this movie updated';
    } else {
      return 'Please, check validate on your fields';
    }
  }
}

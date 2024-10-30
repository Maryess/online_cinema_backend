import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../entity/movie.entity';

export class EvaluationService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async updateEvaluating(id: number, updateEvaluating: number) {
    if (updateEvaluating > 5) {
      return 'Its must be a current value.Please, type to a number with 1 to 5';
    } else {
      this.movieRepository.update(id, {
        evaluation: updateEvaluating,
      });

      return 'Evaluation in this movie updated';
    }
  }
}

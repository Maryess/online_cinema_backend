import { Body, Controller, Patch } from '@nestjs/common';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { EvaluationService } from './evaluation.module';

@Controller('/movie/evaluation')
export class EvaluationController {
  constructor(private readonly EvaluationService: EvaluationService) {}

  @Patch()
  updateEvaluation(@Body() createMovieDto: CreateMovieDto) {
    return this.EvaluationService.updateEvaluating(
      createMovieDto.id,
      createMovieDto.evaluation,
    );
  }
}

import { Body, Controller, Patch } from '@nestjs/common';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { EvaluationService } from './evaluation.module';

@Controller('/movie/evaluation')
export class EvaluationController {
  constructor(private readonly EvaluationService: EvaluationService) {}

  @Patch()
  updateEvaluation(@Body() updateMovieDto: UpdateMovieDto) {
    // return this.EvaluationService.updateEvaluating(
    //   updateMovieDto.id,
    //   updateMovieDto.evaluation,
    // );
  }
}

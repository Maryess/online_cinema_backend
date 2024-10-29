import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../entity/movie.entity';
import { EvaluationController } from './evaluation.controller';
import { EvaluationService } from './evaluation.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [EvaluationController],
  providers: [EvaluationService],
  exports: [EvaluationService],
})
export class EvaluationModule {}

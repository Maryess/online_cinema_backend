import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entity/genre.entity';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { Movie } from 'src/movie/entity/movie.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Genre,Movie])],
  controllers: [GenreController],
  providers: [GenreService],
  exports: [GenreService],
})
export class GenreModule {}
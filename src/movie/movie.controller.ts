import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieService } from './movie.service';

@Controller('/movie')
export class MovieController {
  constructor(private readonly MovieService: MovieService) {}

  @Get()
  getAllUser() {
    return this.MovieService.getAllMovies();
  }

  @Post()
  createUser(@Body() createMovieDto: CreateMovieDto) {
    return this.MovieService.createMovie(createMovieDto.name);
  }

  // @Patch()
  // updateEvaluation(@Body() createMovieDto: CreateMovieDto) {
  //   return this.MovieService.updateEvaluating(
  //     createMovieDto.id,
  //     createMovieDto.evaluation,
  //   );
  // }

  @Delete()
  deleteUser(@Body() createMovieDto: CreateMovieDto) {
    return this.MovieService.removeMovie(createMovieDto.id);
  }

  @Patch()
  updateUser(@Body() createMovieDto: CreateMovieDto) {
    return this.MovieService.updateMovie(
      createMovieDto.id,
      createMovieDto.changeName,
    );
  }
}

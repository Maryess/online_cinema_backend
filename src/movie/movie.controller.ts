import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { MovieService } from './movie.service';

@Controller('/movie')
export class MovieController {
  constructor(private readonly MovieService: MovieService) {}

  @Get()
  getAllMovie() {
    return this.MovieService.getAllMovies();
  }

  @Get(':id')
  getMovieId(@Param('id') id: number) {
    return this.MovieService.getMovieId(id);
  }

  @Post()
  createMovie(@Body() movie: CreateMovieDto) {
    // const movie = new Movie();
    // Object.assign(movie, data);
    return this.MovieService.createMovie(movie);
  }

  // @Delete()
  // deleteAllMovie() {
  //   return this.MovieService.removeAllMovie();
  // }

  @Delete(':id')
  deleteMovie(@Param('id') id: number) {
    return this.MovieService.removeMovie(id);
  }

  @Patch(':id')
  updateMovie(@Param() id: number, @Body() data: UpdateMovieDto) {
    const movie = new Movie();
    Object.assign(movie, data);

    return this.MovieService.updateMovie(id, data);
  }
}

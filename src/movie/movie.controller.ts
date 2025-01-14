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

  // @Get(':id')
  // getMovieId(@Param('id') id: number) {
  //   return this.MovieService.getMovieId(id);
  // }

  @Post()
  createMovie(@Body() movie: CreateMovieDto) {
    return this.MovieService.createMovie(movie);
  }

  @Post(':movieId/:ratingId')
  updateRating(
    @Param('movieId') movieId: string,
    @Param('ratingId') ratingId:string) {
    return this.updateRating(movieId,ratingId)
  }

  // @Delete()
  // deleteAllMovie() {
  //   return this.MovieService.removeAllMovie();
  // }

  @Delete(':id')
  deleteMovie(@Param('id') _id: string) {
    return this.MovieService.removeMovie(_id)
  }

  // @Patch(':id')
  // updateMovie(@Param() id: number, @Body() data: UpdateMovieDto) {
  //   return this.MovieService.updateMovie(id, data);
  // }
}

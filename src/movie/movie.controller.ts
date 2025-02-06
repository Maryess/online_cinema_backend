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
  async getAllMovie() {
    return await this.MovieService.getAllMovies();
  }

  @Get('popular-movie')
  async getPopularMovie(){
    return await this.MovieService.getPopularMovie();
  }

  @Get(':slug')
  async getMovieBySlug(@Param('slug') slug:string){
    return await this.MovieService.getMovieBySlug(slug)
  }

  @Post()
  async createMovie(@Body() movie: CreateMovieDto) {
    return await this.MovieService.createMovie(movie);
  }

  @Post(':movieId/:ratingId')
  updateRating(
    @Param('movieId') movieId: string,
    @Param('ratingId') ratingId:string) {
    return this.updateRating(movieId,ratingId)
  }

  @Delete(':id')
  async deleteMovie(@Param('id') _id: string) {
    return await this.MovieService.removeMovie(_id)
  }

}

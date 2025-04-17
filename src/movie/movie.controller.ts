import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieService } from './movie.service';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('/movie')
export class MovieController {
  constructor(private readonly MovieService: MovieService) {}

  @Get()
  async getAllMovie(@Query('searchTerm') searchTerm?: string) {
    return await this.MovieService.getAllMovies(searchTerm);
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

  @Post('/:movieId/:ratingId')
  updateRating(
    @Param('movieId') movieId: string,
    @Param('ratingId') ratingId:string) {
    return this.updateRating(movieId,ratingId)
  }

  @Put('/:movieId')
  updateMovie(@Param('movieId') movieId:string, @Body() data:CreateMovieDto){
    return this.MovieService.update(movieId,data)
  }

  // @Put('/:movieId/count')
  // updateCount(@Param('movieId') movieId:string){
  //   return this.MovieService.updateCount(movieId)
  // }

  @Delete('/:id')
  async deleteMovie(@Param('id') _id: string) {
    return await this.MovieService.removeMovie(_id)
  }

}

import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CreateActorDto } from 'src/actor/dto/create-actor.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieService } from './movie.service';

@Controller('/movie')
export class MovieController {
  constructor(private readonly MovieService: MovieService) {}

  @Get()
  getAllMovie() {
    return this.MovieService.getAllMovies();
  }

  @Post()
  createMovie(
    @Body() createMovieDto: CreateMovieDto,
    createActorDto: CreateActorDto,
  ) {
    return this.MovieService.createMovie(createMovieDto.name, createActorDto);
  }

  @Delete()
  deleteMovie(@Body() updateMovieDto: UpdateMovieDto) {
    return this.MovieService.removeMovie(updateMovieDto.id);
  }

  @Patch()
  updateMovie(@Body() updateMovieDto: UpdateMovieDto) {
    return this.MovieService.updateMovie(
      updateMovieDto.id,
      updateMovieDto.changeName,
    );
  }
}

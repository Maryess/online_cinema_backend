import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';


@Controller('/movie')
export class GenreController {
  constructor(private readonly GenreService
    : GenreService

  ) {}

  @Get()
  getAllMovie() {
    return this.GenreService
    .getAllGenres();
  }

  @Get(':id')
  getMovieId(@Param('id') id: number) {
    return this.GenreService
    .getGenreId(id);
  }

  @Post()
  createMovie(@Body() movie: CreateGenreDto) {
    // const movie = new Movie();
    // Object.assign(movie, data);
    return this.GenreService
    .createGenre(movie);
  }

  // @Delete()
  // deleteAllMovie() {
  //   return this.GenreService
  // .removeAllMovie();
  // }

  @Delete(':id')
  deleteMovie(@Param('id') id: number) {
    
    return this.GenreService
    .removeGenre(id)

    
  }

//   @Patch(':id')
//   updateMovie(@Param() id: number, @Body() data: UpdateMovieDto) {
//     return this.GenreService
//     .updateMovie(id, data);
//   }
}

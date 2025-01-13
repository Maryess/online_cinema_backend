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


@Controller('/genre')
export class GenreController {
  constructor(private readonly GenreService
    : GenreService

  ) {}

  @Get()
  getAllGenre() {
    return this.GenreService
    .getAllGenres();
  }

  // @Get(':id')
  // getMovieId(@Param('id') _id: string) {
  //   return this.GenreService
  //   .getGenreId(_id);
  // }

  @Post()
  createGenre(@Body() genre: CreateGenreDto) {
    return this.GenreService
    .createGenre(genre);
  }

  // @Delete()
  // deleteAllMovie() {
  //   return this.GenreService
  // .removeAllMovie();
  // }

  // @Delete(':id')
  // deleteMovie(@Param('id') _id: string) {
    
  //   return this.GenreService
  //   .removeGenre(_id)

    
  // }

//   @Patch(':id')
//   updateMovie(@Param() id: number, @Body() data: UpdateMovieDto) {
//     return this.GenreService
//     .updateMovie(id, data);
//   }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';


@Controller('/genre')
export class GenreController {
  constructor(private readonly GenreService
    : GenreService

  ) {}

  @Get('/:id')
  getGenreById(@Param('id') id:string){
    return this.GenreService.genGenreById(id)
  }

  @Get()
  getAllGenre(@Query('searchTerm') searchTerm?: string) {
    return this.GenreService
    .getAllGenres(searchTerm);
  }


  @Post()
  createGenre(@Body() genre: CreateGenreDto) {
    return this.GenreService
    .createGenre(genre);
  }

  @Put('/:id')
  updateGenre(@Param('id') id:string, @Body() data:UpdateGenreDto){
    return this.GenreService.updateGenre(id, data)
  }

  @Delete('/:id')
  deleteGenreById(@Param('id') id:string){
    return this.GenreService.deleteGenreById(id)
  }

  @Delete()
  deleteAllGenres(){
    return this.GenreService.deleteAllGenres()
  }
}

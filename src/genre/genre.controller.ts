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

  @Post()
  createGenre(@Body() genre: CreateGenreDto) {
    return this.GenreService
    .createGenre(genre);
  }
}

import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateMovieDto } from 'src/movie/dto/create-movie.dto';

export class UpdateActorDto {
  name: string;

  @ValidateNested()
  @IsArray()
  @Type(() => CreateMovieDto)
  movies: CreateMovieDto[];
}

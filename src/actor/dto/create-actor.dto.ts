import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateMovieDto } from 'src/movie/dto/create-movie.dto';

export class CreateActorDto {
  name: string;

  @ValidateNested()
  @IsArray()
  @Type(() => CreateMovieDto)
  movies: CreateMovieDto[];
}

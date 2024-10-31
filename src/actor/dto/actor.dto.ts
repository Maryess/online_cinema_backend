import { Movie } from 'src/movie/entity/movie.entity';

export class ActorDto {
  id: string;
  name: string;
  movie: Movie;
}

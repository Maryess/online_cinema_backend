import { CreateActorDto } from 'src/actor/dto/create-actor.dto';

export class CreateMovieDto {
  name: string;
  actor: CreateActorDto;
}

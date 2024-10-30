import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from 'src/movie/dto/create-movie.dto';
import { Repository } from 'typeorm';
import { Actor } from './entity/actor.entity';

export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}

  async createActor(
    name: string,
    movie: CreateMovieDto,
  ): Promise<Actor | string> {
    const actor = this.actorRepository.create({ name, ...movie });

    if (actor) {
      return this.actorRepository.save(actor);
    } else {
      return 'Please,check validate on your fields';
    }
  }

  async removeActor(id: number) {
    const actor = this.actorRepository.delete({ id: id });

    if (actor) {
      return 'Actor delete';
    } else {
      return 'Please,check validate on your fields';
    }
  }

  async updateActor(id: number, changeName: string) {
    const actor = this.actorRepository.update(id, { name: changeName });

    if (actor) {
      return 'Movie updated';
    } else {
      return 'Please,check validate on your fields';
    }
  }

  async getAllActor() {
    return this.actorRepository.find({
      relations: {
        movies: true,
      },
    });
  }
}

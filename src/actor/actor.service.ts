import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateActorDto } from './dto/update-actor.dto';
import { Actor } from './entity/actor.entity';

export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}

  async createActor(actor: Actor) {
    const createActor = this.actorRepository.create(actor);

    if (createActor) {
      return this.actorRepository.save(createActor);
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

  async updateActor(id: number, actor: UpdateActorDto) {
    const updateActor = this.actorRepository.update(id, {
      ...actor,
    });

    if (updateActor) {
      return { message: 'Actor updated', id: `${id}` };
    } else {
      return 'Please,check validate on your fields';
    }
  }

  async getAllActor() {
    return this.actorRepository.find();
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateActorDto } from './dto/update-actor.dto';
import { Actor } from './entity/actor.entity';
import { CreateActorDto } from './dto/create-actor.dto';

export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}

  async createActor(actor: CreateActorDto) {
    const {name,year,country,photo} = actor

    const createActor = this.actorRepository.create({
      name:name,
      year:year,
      country:country,
      photo:photo
    });

    if (createActor) {
      return this.actorRepository.save(createActor);
    } else {
      return 'Please,check validate on your fields';
    }
  }

  async removeActor(name: string) {
    const actor = this.actorRepository.delete({ name:name });

    if (actor) {
      return 'Actor delete';
    } else {
      return 'Please,check validate on your fields';
    }
  }

  async removeAllActor(){
    const removeActors = this.actorRepository.remove

    if(removeActors){
      return {
        message:'Actors deleted'
      }
    }
    // if(getAllMovie){
    //   return {
    //     message:'Actors deleted'
    //   }
    // }else{
    //   return {
    //     message:'Actors didnt deleted'
    //   }
    // }

  }

  async updateActor(id: number, actor: UpdateActorDto) {
    const updateActor = this.actorRepository.update(id,{...actor});

    if (updateActor) {
      return { message: 'Actor updated', id: `${id}` };
    } else {
      return 'Please,check validate on your fields';
    }
  }

  async getAllActor() {
    return this.actorRepository.find();
  }

  async getActorId(id: number) {
    return this.actorRepository.findOne({ where: { id: id } });
  }
}

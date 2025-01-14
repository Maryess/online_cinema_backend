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
    const {name,slug,year,country,photo} = actor

    const createActor = this.actorRepository.create({
      name:name,
      slug:slug,
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

  async removeActor(_id: string) {
    const actor = this.actorRepository.delete({ id: _id });

    if (actor) {
      return {
        message:'Actor deleted'};
    } else {
      return {
        message:"Actor don't deleted"
      };
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

  async updateActor(_id: string, actor: UpdateActorDto) {
    const updateActor = this.actorRepository.update(_id,{...actor});

    if (updateActor) {
      return { message: 'Actor updated', id: `${_id}` };
    } else {
      return 'Please,check validate on your fields';
    }
  }

  async getAllActor() {
    return this.actorRepository.find({
      relations:{
        movies:true
      }
    });
  }

  async getActorId(_id: string) {
    return this.actorRepository.findOne({ where: { id: _id } });
  }
}

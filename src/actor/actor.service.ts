import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateActorDto } from './dto/update-actor.dto';
import { Actor } from './entity/actor.entity';
import { CreateActorDto } from './dto/create-actor.dto';
import { Movie } from 'src/movie/entity/movie.entity';

export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}

  async createActor(actor: CreateActorDto) {
    try{
      const {name,slug,year,country,photo} = actor

    const createActor = await this.actorRepository.create({
      name:name,
      slug:slug,
      year:year,
      country:country,
      photo:photo
    });

    return await this.actorRepository.save(createActor);
    }catch{
      return {
        status:false
      }
    }
    
  }

  async removeActor(actorId: string) {
    try {
          const actor = await this.actorRepository.findOne({ where: { id: actorId }, relations: ['movies'] }); // relations: ['genres', 'actors']
          if (!actor) {
            return false; 
          }
    
          await this.actorRepository.createQueryBuilder()
            .relation(Actor, 'movies')
            .of(actor)
            .remove(actor.movies);
    
          await this.actorRepository.remove(actor);
          return true;
        } catch (error) {
          console.error("Ошибка при удалении фильма:", error);
          return false;
        }
  }

  async removeAllActor(){
    const removeActors = this.actorRepository.remove

    if(removeActors){
      return {
        message:'Actors deleted'
      }
    }
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
    try{
      return this.actorRepository.find({
        relations:{
          movies:true
        }
      });
    }catch{
      return {
        status:false
      }
    }
    
  }

  async getActorId(_id: string) {
    try{
      return await this.actorRepository.findOne({ where: { id: _id } });
    }catch{
      return {
        status:false
      }
    }
  
  }
}

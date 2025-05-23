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
    try{
      const {name ='',slug='',year=0,country='',photo=''} = actor

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
          console.error("Ошибка при удалении актера:", error);
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

  async updateActor(actorId: string, data: UpdateActorDto) {
    try{
      const updateActor = this.actorRepository.update(actorId,{...data});

     return updateActor
    }catch(error){
      return {
        error: error
      }
    }
    
  }

  async getAllActor(searchTerm?:string) {

    const queryBuilder = this.actorRepository
    .createQueryBuilder('actor')
    .leftJoinAndSelect('actor.movies','movie')
    .where('actor.deleted_at IS NULL')

    if(searchTerm){
      queryBuilder.andWhere(
        "to_tsvector('english', actor.name || ' ' || actor.slug) @@ plainto_tsquery('english', :searchTerm)",
        {searchTerm}
      )
    }

    try{
      const actors = queryBuilder.getMany()

      const newActors = (await actors).sort((a,b)=>a.name.localeCompare(b.name))

      return newActors
    }catch(error){
      return error
    }
    
  }

  async getActorBySlug(slug:string){
    try {
      const actor = await this.actorRepository.findOne({where:{slug: slug},
      relations:['movies']
      });

      return actor
    } catch (error) {
      console.error("Error fetching actor:", error); 
      return error
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

  // async getMovies(){
  //   try{
  //     return await this.actorRepository.find
  //   }catch{

  //   }
  // }
}

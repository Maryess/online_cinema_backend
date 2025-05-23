import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { Actor } from './entity/actor.entity';

@Controller('/actor')
export class ActorController {
  constructor(private readonly ActorService: ActorService) {}

  @Get()
  getAllActor(@Query('searchTerm') searchTerm?:string) {
    return this.ActorService.getAllActor(searchTerm);
  }

  @Get(':slug')
  async getActorBySLug(@Param('slug') slug:string){
    return await this.ActorService.getActorBySlug(slug)
  }

  @Post()
  createActor(@Body() actor: CreateActorDto) {
    return this.ActorService.createActor(actor);
  }

  @Delete(':name')
  deleteActor(@Param('name') name: string) {
    return this.ActorService.removeActor(name);
  }

  @Delete()
  deleteAllActors(){
    return this.ActorService.removeAllActor()
  }

  @Put(':id')
  updateActor(@Param('id') _id: string, @Body() data: UpdateActorDto) {
    return this.ActorService.updateActor(_id, data);
  }
}

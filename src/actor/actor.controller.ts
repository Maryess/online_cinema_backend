import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { Actor } from './entity/actor.entity';

@Controller('/actor')
export class ActorController {
  constructor(private readonly ActorService: ActorService) {}

  @Get()
  getAllActor() {
    return this.ActorService.getAllActor();
  }

  @Post()
  createActor(@Body() data: CreateActorDto) {
    const actor = new Actor();
    Object.assign(actor, data);
    return this.ActorService.createActor(actor);
  }

  @Delete(':id')
  deleteActor(@Param('id') id: number, @Body() updateActroDto: UpdateActorDto) {
    return this.ActorService.removeActor(id);
  }

  @Patch(':id')
  updateActor(@Param('id') id: number, @Body() data: UpdateActorDto) {
    const actor = new Actor();
    Object.assign(actor, data);
    return this.ActorService.updateActor(id, data);
  }
}

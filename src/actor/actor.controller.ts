import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';

@Controller('/actor')
export class ActorController {
  constructor(private readonly ActorService: ActorService) {}

  @Get()
  getAllUser() {
    return this.ActorService.getAllActor();
  }

  @Post()
  createUser(@Body() createActorDto: CreateActorDto) {
    return this.ActorService.createActor(createActorDto.name);
  }

  @Delete()
  deleteUser(@Body() createActorDto: CreateActorDto) {
    return this.ActorService.removeActor(createActorDto.id);
  }

  @Patch()
  updateUser(@Body() createActorDto: CreateActorDto) {
    return this.ActorService.updateActor(
      createActorDto.id,
      createActorDto.changeName,
    );
  }
}

import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CreateMovieDto } from 'src/movie/dto/create-movie.dto';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@Controller('/actor')
export class ActorController {
  constructor(private readonly ActorService: ActorService) {}

  @Get()
  getAllUser() {
    return this.ActorService.getAllActor();
  }

  @Post()
  createUser(
    @Body() createActorDto: CreateActorDto,
    createMovieDto: CreateMovieDto,
  ) {
    return this.ActorService.createActor(createActorDto.name, createMovieDto);
  }

  @Delete()
  deleteUser(@Body() updateActroDto: UpdateActorDto) {
    return this.ActorService.removeActor(updateActroDto.id);
  }

  @Patch()
  updateUser(@Body() updateActroDto: UpdateActorDto) {
    return this.ActorService.updateActor(
      updateActroDto.id,
      updateActroDto.changeName,
    );
  }
}

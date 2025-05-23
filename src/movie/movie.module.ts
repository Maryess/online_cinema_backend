import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entity/movie.entity';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Actor } from 'src/actor/entity/actor.entity';
import { Genre } from 'src/genre/entity/genre.entity';
import { User } from 'src/user/entity/user.entity';
import { Rating } from 'src/rating/entity/rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie,Actor,Genre,User,Rating])],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}

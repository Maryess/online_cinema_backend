import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorModule } from './actor/actor.module';
import { Actor } from './actor/entity/actor.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Movie } from './movie/entity/movie.entity';
import { MovieModule } from './movie/movie.module';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { GenreModule } from './genre/genre.module';
import { Genre } from './genre/entity/genre.entity';
import { RatingModule } from './rating/rating.module';
import { Rating } from './rating/entity/rating.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule available globally
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '6666',
      username: 'postgres',
      database: 'cinema',
      synchronize: true,
      logging: true,
      entities: [User, Actor, Movie, Genre, Rating],
    }),
    UserModule,
    ActorModule,
    MovieModule,
    AuthModule,
    FileModule,
    GenreModule,
    RatingModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

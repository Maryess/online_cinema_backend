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
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricsController } from './metric.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule available globally
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '6666',
      database: process.env.DB_NAME || 'cinema',
      synchronize: false, 
      logging: true,
      entities: [User, Actor, Movie, Genre, Rating],
    }),
    PrometheusModule.register({
      path: '/metrics',
      defaultMetrics:{
        enabled:true
      }
    }),

    UserModule,
    ActorModule,
    MovieModule,
    AuthModule,
    FileModule,
    GenreModule,
    RatingModule
  ],

  controllers: [AppController, MetricsController],
  providers: [AppService],
})
export class AppModule {}

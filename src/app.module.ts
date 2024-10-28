import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { User } from './user/entity/user.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '2012',
      username: 'postgres',
      database: 'cinema',
      synchronize: true,
      logging: true,
      entities: [User],
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'fhsguhURSKNDDKJhfdgjsn123sjkg',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService, AuthService, UserService],
})
export class AppModule {}

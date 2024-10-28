import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(
    email: string,
    password: string,
    name: string,
  ): Promise<User | string> {
    const createUser = this.userRepository.create({ name, password, email });

    if (createUser) {
      throw new NotAcceptableException('User already exist ');
    }

    return this.userRepository.save(createUser);
  }

  async signIn(email: string, password: string, name: string) {
    const getUser = this.userRepository.findOne({
      where: {
        name: name,
        email: email,
        password: password,
      },
    });

    const payload = { username: name };

    if (getUser) {
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new Error('Please, check your fields on valid');
    }
  }
}

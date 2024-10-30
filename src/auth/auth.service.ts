import { Injectable } from '@nestjs/common';
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
    const payload = { username: name };
    const access_token = this.jwtService.sign(payload);

    const createUser = this.userRepository.create({
      name,
      password,
      email,
      access_token,
    });

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
    if (getUser) {
      return getUser;
    } else {
      throw new Error('Please, check your fields on valid');
    }
  }
}

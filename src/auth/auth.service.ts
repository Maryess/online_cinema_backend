import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(user: CreateUserDto): Promise<User | string> {
    const { email, password, name } = user;

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

  async signIn(user: CreateUserDto) {
    const { email, name, password } = user;
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

  async verifyToken(user: CreateUserDto) {
    const { name, email } = user;
    const allUsers = this.userRepository.find();
    (await allUsers).map((user) => {
      if (user.access_token === null) {
        const payload = { name: name, email: email };
        const refresh_token = this.jwtService.sign(payload);
        return this.userRepository.update(user.id, {
          access_token: refresh_token,
        });
      }
    });
  }
}

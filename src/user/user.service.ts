import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(
    email: string,
    password: string,
    name: string,
  ): Promise<User> {
    const user = this.userRepository.create({ name, email, password });

    return this.userRepository.save(user);
  }

  async getAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }
}

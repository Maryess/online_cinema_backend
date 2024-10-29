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

  async removeUser(name: string): Promise<User | string> {
    const user = this.userRepository.findOne({
      where: {
        name: name,
      },
    });

    if (user) {
      this.userRepository.delete({ name: name });
      return 'User deleted';
    } else {
      return 'User not found';
    }
  }

  async updateUser(id: number, changeName: string): Promise<User | string> {
    const user = this.userRepository.update(id, { name: changeName });

    if (user) {
      return 'User updated';
    }
  }
}

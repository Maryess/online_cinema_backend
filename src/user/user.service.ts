import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto) {
    const { name, email, password } = user;
    const createUser = this.userRepository.create({ name, email, password });

    if (createUser) {
      return {
        message: 'User created',
      };
    }

    return this.userRepository.save(user);
  }

  async getAllUser() {
    return this.userRepository.find();
  }

  async removeUser(id: number) {
    const user = this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      this.userRepository.delete({ id: id });
      return {
        message: 'User deleted',
        id: `${id}`,
      };
    } else {
      return {
        message: 'Error',
      };
    }
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const updateUser = this.userRepository.update(id, { ...user });

    if (updateUser) {
      return {
        message: 'User updated',
        id: `${id}`,
      };
    }
  }
}

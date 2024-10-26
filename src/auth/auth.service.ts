import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/entity/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(email: string, password: string, name: string): Promise<User> {
    const createUser = this.userRepository.create({ email, password, name });

    return this.userRepository.save(createUser);
  }

  async auth(email: string, password: string, name: string): Promise<User> {
    if (name && password && email) {
      const getUser = this.userRepository.findOne({
        where: {
          name: name,
          email: email,
          password: password,
        },
      });

      return getUser;
    } else {
      throw new Error('Please, check your fields on valid');
    }
  }
}

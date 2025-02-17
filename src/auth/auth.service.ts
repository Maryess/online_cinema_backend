import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(data: AuthDto) {
    try{
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);
    
    const oldUser = await this.userRepository.findOneBy({email:data.email})
    if(oldUser){
      throw new BadRequestException('User with this email is already in the system ')
    }

    const createUser = this.userRepository.create({
      password: hashPassword,
      email:data.email,
      name:'',
      access_token:'',
      refresh_token:''
    });
  
    const savedUser = await this.userRepository.save(createUser); 
    
    return savedUser
  }catch(error){
    return{message:error}
  }
  }

  async auth(data: AuthDto) {
    return this.validate(data)
  }

  async validate(data:AuthDto){
    const user = await this.userRepository.findOneBy({email:data.email})
    if(!user) throw new UnauthorizedException('User not found')

    const isValidPassword = await bcrypt.compare(data.password, user.password)
    if(!isValidPassword) throw new UnauthorizedException('Password is not correct') 

    return user
  }

}

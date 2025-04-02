import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'; 
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async findByEmail (email:string) {
    return this.userRepository.findOneBy({email:email})
  }

  async register(data: AuthDto) {
    try{
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);
    
    const createUser = this.userRepository.create({
      password: hashPassword,
      email:data.email
    });
  
    await this.userRepository.save(createUser); 
    
    const tokens = await this.isTokenKey(createUser.id)

    return{user:this.returnUserFields(createUser),
      ...tokens
    }
  }catch(error){
    return{message:error}
  }
  }

  async auth(data: AuthDto) {
    try{
    const user =await this.validate(data)

    const tokens = await this.isTokenKey(user.id)

    return{user:this.returnUserFields(user),
      ...tokens
    }
    }catch(error){
      return{message:error}
    }
  }

  async getNewTokens({refreshToken}:RefreshTokenDto){
    try{
    if(!refreshToken) throw new UnauthorizedException('Please, sign in!')

    const result = await this.jwtService.verifyAsync(refreshToken)
    if(!result) throw new UnauthorizedException('Invalid token')

    const user = await this.userRepository.findOneBy({id:result.id})
    const tokens = await this.isTokenKey(user.id)

    return {
      user:this.returnUserFields(user)
      ,...tokens}
    }catch(error){
      return{
        message:error
      }
    }
  }

  async validate(data:AuthDto){
    const user = await this.userRepository.findOneBy({email:data.email})
    if(!user) throw new UnauthorizedException('User not found')

    const isValidPassword = await bcrypt.compare(data.password, user.password)
    if(!isValidPassword) throw new UnauthorizedException('Password is not correct') 

    return user
  }

  async isTokenKey(userId:string){
    try{
    const data = {id:userId}

    const refreshToken = await this.jwtService.signAsync(data,{
      expiresIn:'15d'
    })

    const accessToken = await this.jwtService.signAsync(data,{
      expiresIn:'15h'
    })

    return{refreshToken,accessToken}
  }catch(error){
    return{message:error}
  }
  }

  returnUserFields(user:User){
    return{
      id:user.id,
      email:user.email,
      isAdmin:user.isAdmin
    }
  }

  

}

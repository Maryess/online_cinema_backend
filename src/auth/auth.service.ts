import { BadRequestException, Injectable } from '@nestjs/common';
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

  async register(user: CreateUserDto) {
    const { email, password, name } = user;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
  
    const createUser = this.userRepository.create({
      name,
      password: hashPassword,
      email,
      access_token:'',
      refresh_token:''
    });
  
    const savedUser = await this.userRepository.save(createUser); 
    const tokens = await this.getTokens(savedUser.id, savedUser.name);
    await this.updateRefreshToken(savedUser.id, tokens.refreshToken);
    return tokens; 
  }

  async auth({name,password,email}: AuthDto) {
    const getUser = await this.userRepository.findOne({where:{
      name:name,
      email:email
    }});
    if (!getUser) throw new BadRequestException('User does not exist');
    const passwordMatches = await bcrypt.compare(password, getUser.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(getUser.id, getUser.name);
    await this.updateRefreshToken(getUser.id, tokens.refreshToken);
    return getUser;
  }

  async verifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });
      return payload;
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userRepository.update(userId, {
      refresh_token: hashedRefreshToken,
    });
  }

  async hashData(data: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(data, salt);
  }

}

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
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    
    const createUser = this.userRepository.create({
      name,
      password:hashPassword,
      email,
      
    });

    const tokens = await this.getTokens(createUser.id, createUser.name);
    await this.updateRefreshToken(createUser.id, tokens.refreshToken);
    return tokens;

    return this.userRepository.save(createUser);
  }

  async auth(auth: AuthDto) {
    const getUser = await this.userRepository.findOne({where:{
      name:auth.name
    }});
    if (!getUser) throw new BadRequestException('User does not exist');
    const passwordMatches = await bcrypt.compare(getUser.password, auth.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(getUser.id, getUser.name);
    await this.updateRefreshToken(getUser.id, tokens.refreshToken);
    return tokens;
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
    const hashedRefreshToken = await this.hashData(refreshToken,'fsgsysffsdgvx');
    await this.userRepository.update(userId, {
      refresh_token:hashedRefreshToken
    });
  }

  hashData(data: string,token:string) {
    return bcrypt.hash(data,token);
  }

}

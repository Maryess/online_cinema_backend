import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/entity/user.entity";
import { Repository } from "typeorm";

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate({id}:Pick<User,'id'>){
        try{
            const user = await this.userRepository.findOneBy({ id:id });
            console.log('JwtStrategy.validate - User:', user); // Log the user

            if (!user) {
                console.log('JwtStrategy.validate - User not found!'); // Log if user not found
                throw new UnauthorizedException();
            }

            return user;
        }catch(error){
            console.error('JwtStrategy.validate - Error:', error); // Log any errors
            throw new UnauthorizedException();
        }
    }
}
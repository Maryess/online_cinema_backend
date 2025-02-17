import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/entity/user.entity";
import { Repository } from "typeorm";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly userRepository: Repository<User>,
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'dfsgsgew'
        })
    }

    async validate({id}:Pick<User,'id'>){
        return await this.userRepository.findOneBy({id:id})
    }
}
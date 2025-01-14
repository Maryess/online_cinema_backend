import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Rating } from "./entity/rating.entity";
import { Movie } from "src/movie/entity/movie.entity";
import { RatingService } from "./rating.service";
import { RatingController } from "./rating.controller";

@Module({
    imports:[
        TypeOrmModule.forFeature([Rating,Movie])
    ],
    providers:[RatingService],
    controllers:[RatingController],
    exports:[RatingService]
})

export class RatingModule{}
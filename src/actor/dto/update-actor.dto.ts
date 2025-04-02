import { IsArray, IsNumber, IsString } from "class-validator";
import { Movie } from "src/movie/entity/movie.entity";

export class UpdateActorDto {
    @IsString()
    name:string;
    @IsString()
    slug:string;
    @IsNumber()
    year:number;
    @IsNumber()
    country:string;
    @IsString()
    photo:string;
}

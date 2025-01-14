import { IsArray, IsNumber } from "class-validator";

export class createRatingDto{
    @IsNumber()
    value:number;

    @IsArray()
    movies:string[]
}
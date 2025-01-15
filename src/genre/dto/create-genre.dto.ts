import { IsArray, IsString } from "class-validator";

export class CreateGenreDto{
    @IsString()
    name:string;

    @IsString()
    slug:string;

    @IsArray()
    movies?:string[]
}
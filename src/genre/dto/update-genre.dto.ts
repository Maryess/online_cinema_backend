import { IsArray, IsString } from "class-validator";

export class UpdateGenreDto{
    @IsString()
    name:string;

    @IsString()
    slug:string;

}
import { IsString } from "class-validator";

export class CreateGenreDto{
    @IsString()
    name:string;

    @IsString()
    deskription:string;

    
}
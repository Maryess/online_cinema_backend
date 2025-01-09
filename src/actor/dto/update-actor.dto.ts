import { IsNumber, IsString } from "class-validator";

export class UpdateActorDto {
   @IsString()
    firstName: string;
    @IsString()
    lastName:string;
    @IsNumber()
    year:number;
}

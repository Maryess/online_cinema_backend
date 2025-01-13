import { IsNumber, IsString } from "class-validator";

export class CreateActorDto {
  @IsString()
  name:string;
  @IsNumber()
  year:number;
  @IsNumber()
  country:string;
  @IsString()
  photo:string;
}

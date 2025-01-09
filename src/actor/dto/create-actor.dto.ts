import { IsNumber, IsString } from "class-validator";

export class CreateActorDto {
 @IsString()
  firstName: string;
  @IsString()
  lastName:string;
  @IsNumber()
  year:number;
}

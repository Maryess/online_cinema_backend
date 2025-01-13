import { IsArray, IsNumber, IsObject, IsString } from 'class-validator';


export class CreateMovieDto {
  @IsString()
  poster:string;

  @IsString()
  bigPoster:string;
  
  @IsString()
  name: string;
  
  @IsString()
  deskription:string;
  
  @IsNumber()
  year:number;
  @IsNumber()
  duration:number;
  @IsString()
  country:string;
  
  @IsString()
  videoUrl:string;
  
  @IsArray()
  @IsString({each:true})
  genres:string[];
  
  @IsArray()
  @IsString({each:true})
  actors:string[];
}

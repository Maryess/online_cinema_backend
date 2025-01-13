import { isArray, IsArray, IsNumber, IsObject, IsString } from 'class-validator';

export class Parameters{
  @IsNumber()
  year:number;
  @IsNumber()
  duration:number;
  @IsString()
  country:string;
}

export class CreateMovieDto {
  @IsString()
  poster:string;

  @IsString()
  bigPoster:string;
  
  @IsString()
  name: string;
  
  @IsString()
  deskription:string;
  
  @IsObject()
  parametrs:Parameters;
  
  @IsString()
  videoUrl:string;
  
  @IsArray()
  @IsString({each:true})
  genres:string[];
  
  @IsArray()
  @IsString({each:true})
  actors:string[];
}

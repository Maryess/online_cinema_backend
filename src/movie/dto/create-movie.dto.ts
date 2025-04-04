import { IsArray, IsNumber, IsString } from 'class-validator';


export class CreateMovieDto {
  @IsString()
  poster:string;

  @IsString()
  bigPoster:string;
  
  @IsString()
  name: string;
  
  @IsString()
  slug: string;

  @IsString()
  deskription:string;
  
  @IsNumber()
  year:number;
  @IsNumber()
  duration:number;
  @IsString()
  country:string;
  
  @IsNumber()
  rating?:number;

  @IsString()
  videoUrl:string;
  
  @IsArray()
  @IsString({each:true})
  genres:string[];
  
  @IsArray()
  @IsString({each:true})
  actors:string[];

  @IsArray()
  @IsString({each:true})
  favorites?:string[];
}

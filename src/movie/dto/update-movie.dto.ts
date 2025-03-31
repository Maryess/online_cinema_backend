import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';


export class UpdateMovieDto {
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
 
  @IsString()
  videoUrl:string;
  
  @IsArray()
  @IsString({each:true})
  @IsOptional()
  genres?:string[];
  
  @IsArray()  // Важно: теперь это массив строк (ID актеров)
  @IsString({ each: true }) // Гарантирует, что каждый элемент - строка
  @IsOptional()
  actors?: string[]; // Массив ID актеров
}

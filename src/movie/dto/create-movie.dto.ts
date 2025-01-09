import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  name: string;
  @IsNumber()
  year: number;
  // actor: CreateActorDto;
}

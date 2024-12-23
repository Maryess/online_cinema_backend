export class CreateActorDto {
  name: string;

  // @ValidateNested()
  // @IsArray()
  // @Type(() => CreateMovieDto)
  // movies: CreateMovieDto[];
}

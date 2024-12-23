export class UpdateActorDto {
  name: string;

  // @ValidateNested()
  // @IsArray()
  // @Type(() => CreateMovieDto)
  // movies: CreateMovieDto[];
}

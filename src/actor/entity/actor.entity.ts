import { Movie } from 'src/movie/entity/movie.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Actor {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @OneToMany(() => Movie, (movie) => movie.actor, {
    eager: true,
  })
  movies: Movie[];
}

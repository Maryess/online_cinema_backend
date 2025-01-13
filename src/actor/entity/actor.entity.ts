import { Movie } from 'src/movie/entity/movie.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('actors')
export class Actor {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name:string;
  @Column()
  slug:string;
  @Column()
  year:number;
  @Column()
  country:string;
  @Column()
  photo:string;
  @ManyToMany(()=>Movie,(movie)=>movie.actors)
  @JoinTable({
    name: 'movies_actors', 
    joinColumn: {
      name: 'actor_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
  })
  movies: Movie[];

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @DeleteDateColumn()
  deleted_at: Date;
}

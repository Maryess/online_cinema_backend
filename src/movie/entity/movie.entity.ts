import { Actor } from 'src/actor/entity/actor.entity';
import { Genre } from 'src/genre/entity/genre.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  poster:string; 

  @Column()
  bigPoster:string;
  
  @Column()
  name: string;
  
  @Column()
  slug: string;

  @Column()
  deskription:string;
  
  @Column()
  year:number;
  @Column()
  duration:number;
  @Column()
  country:string;
  
  @Column()
  videoUrl:string;
  
  @Column({default:4.0})
  rating?:number;

  @Column({default:0})
  countOpened?:number;
  
  @ManyToMany(()=>Actor,(actor)=>actor.movies)
  @JoinTable({
    name: 'actors_movies', 
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'actor_id',
      referencedColumnName: 'id',
    },
  })
  actors: Actor[];

  @ManyToMany(()=>Genre,(genre)=>genre.movies)
  @JoinTable({
    name: 'genre_movies', 
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'genre_id',
      referencedColumnName: 'id',
    },
  })
  genres: Genre[];

  @ManyToMany(()=>User, (user)=> user.favorites)
  users: User[];
  
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @DeleteDateColumn()
  deleted_at: Date;
}

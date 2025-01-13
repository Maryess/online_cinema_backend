import { Actor } from 'src/actor/entity/actor.entity';
import { Genre } from 'src/genre/entity/genre.entity';
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
  actors:Actor[]

  @ManyToMany(()=> Genre,(genre) => genre.movies)
  genres:Genre[]
  
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @DeleteDateColumn()
  deleted_at: Date;
}

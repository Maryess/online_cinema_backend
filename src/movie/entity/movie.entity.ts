import { Actor } from 'src/actor/entity/actor.entity';
import { Genre } from 'src/genre/entity/genre.entity';
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  poster:string;

  @Column()
  bigPoster:string;
  
  @Column()
  name: string;
  
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
  
  @Column("char",{array:true})
  @ManyToOne(type=>Actor)
  actors:Actor[];

  @Column("char",{array:true})
  @ManyToOne(type=>Genre)
  genres:Genre[];

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @DeleteDateColumn()
  deleted_at: Date;
}

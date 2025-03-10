import { Movie } from 'src/movie/entity/movie.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  access_token: string;
  @Column()
  refresh_token:string;
  @Column()
  isAdmin:boolean;
  @ManyToMany(()=>Movie,(movie)=>movie.users)
  @JoinTable({
    name: 'users_favorite_movies', 
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    })
    favorites: Movie[];
  

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @DeleteDateColumn()
  deleted_at: Date;
}

import { Movie } from 'src/movie/entity/movie.entity';
import {Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm'

@Entity('ratings')
export class Rating {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    value:number;
    
    @OneToMany(()=>Movie,(movie)=>movie.rating)
    //  @JoinTable({
    //     name: 'movies_ratings', 
    //     joinColumn: {
    //       name: 'rating_id',
    //       referencedColumnName: 'id',
    //     },
    //     inverseJoinColumn: {
    //       name: 'movie_id',
    //       referencedColumnName: 'id',
    //     },
    //   })
    movies:Movie[]
}
import { Movie } from 'src/movie/entity/movie.entity';
import {Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm'

@Entity('ratings')
export class Rating {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    value:number;
    
    @OneToMany(()=>Movie,(movie)=>movie.rating)
    movies:Movie[]
}
import { Movie } from "src/movie/entity/movie.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity('genres')
export class Genre {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    name:string;

    @Column()
    slug:string;

    @ManyToMany(()=>Movie,(movie)=>movie.genres)
    @JoinTable({
        name:'movies_genres',
        joinColumn:{
            name:'movie_id',
            referencedColumnName:'id'            
        },
        inverseJoinColumn:{
            name:'genre_id',
            referencedColumnName:'id'
        }
    })
    movies:Movie[]
    
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
    @DeleteDateColumn()
    deleted_at: Date;
}
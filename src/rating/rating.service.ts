import { InjectRepository } from "@nestjs/typeorm";
import { Rating } from "./entity/rating.entity";
import { Injectable } from "@nestjs/common";
import {Repository} from "typeorm"
import { Movie } from "src/movie/entity/movie.entity";
import { createRatingDto } from "./dto/create-rating.dto";

@Injectable()
export class RatingService {
    constructor(
        @InjectRepository(Rating)
        private readonly ratingRepository : Repository<Rating>,
        @InjectRepository(Movie)
        private readonly movieRepository : Repository<Movie>
    ){}

    async createRating(rating: createRatingDto){
        const {value,movies:moviesIds} = rating;
      
        const movies = await this.movieRepository.find({
            where: moviesIds.map((id)=>({id}))
        })

        const createRating = this.ratingRepository.create({value:value,movies})

        if(!createRating){
            throw new Error('It didnt work')
        }

        return this.ratingRepository.save(createRating)
    }

    async addRatingToMovie(movieId:string, ratingId:string){
        
        const movie = await this.movieRepository.findOneBy({
            id:movieId
        })

        const rating = await this.ratingRepository.findOneBy({
            id: ratingId
        }) 

        if(!rating.movies){
            rating.movies = []
        } 

        rating.movies.push(movie)

        return await this.ratingRepository.save(rating);
    }

    async getllRatings () {
        return this.ratingRepository.find(
            {
                relations:{
                    movies:true
                }
            }
        )
    }

    async deleteRatingById (ratingId:string) {
        const deleteRating = this.ratingRepository.delete({id:ratingId})

        if(!deleteRating){
            throw new Error ('It didnt work')
        }

        return deleteRating
    }
}
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

    async addRatingToMovie(rating: createRatingDto){
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
import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { RatingService } from "./rating.service";
import { createRatingDto } from "./dto/create-rating.dto";

@Controller('/rating')
export class RatingController { 
    constructor(
        private readonly RatingService : RatingService
    ){
    }

    @Post()
    createRating(@Body() data: createRatingDto){
        return this.RatingService.createRating(data)
    }

    @Post(':ratingId/movies/:movieId')
  updateUser(@Param('ratingId') ratingId: string,
   @Param('movieId') movieId:string) {
    return this.RatingService.addRatingToMovie(ratingId,movieId);
  }

    @Get()
    getAllRatings(){
        return this.RatingService.getllRatings()
    }

    @Delete('/:ratingId')
    deleteRatingById(@Param('ratingId') ratingId:string){
        return this.RatingService.deleteRatingById(ratingId)
    }
}
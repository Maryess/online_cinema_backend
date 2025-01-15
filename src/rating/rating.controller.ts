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
    addRatingToMovie(@Body() data: createRatingDto){
        return this.RatingService.addRatingToMovie(data)
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
import { Controller, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('/file')
export class FileController{
    constructor(private readonly FileService:FileService){}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
     async uploadFile(@UploadedFile() file:Express.Multer.File, @Query('folder') folder?:string){
       return this.FileService.saveFiles([file], folder)
    }
}
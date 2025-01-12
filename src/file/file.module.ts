import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import {path} from "app-root-path"
import { FileService } from "./file.service";
import { FileController } from "./file.controller";

@Module({
    imports:[
        ServeStaticModule.forRoot({
            rootPath: `${path}/uploads`,
            serveRoot:'/uploads'
        })
    ],
    providers:[FileService],
    controllers:[FileController],
    exports:[FileService]
})

export class FileModule{}
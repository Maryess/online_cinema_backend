import { Logger, Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import {path} from "app-root-path"
import { FileService } from "./file.service";
import { FileController } from "./file.controller";

@Module({
    imports:[
        ServeStaticModule.forRoot({
            rootPath: `${path}/uploads`,
            serveRoot:'/uploads',
            serveStaticOptions: {
                index: false, // Отключаем автоматический показ index.html
                fallthrough: true, // Важно: Если файл не найден, передаем запрос дальше
                setHeaders: (res, path) => {
                  Logger.log(`Serving static file: ${path}`, 'ServeStaticModule');
                },
              },
        })
    ],
    providers:[FileService],
    controllers:[FileController],
    exports:[FileService]
})

export class FileModule{}
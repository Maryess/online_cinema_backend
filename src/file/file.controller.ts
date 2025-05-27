import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFile } from 'fs/promises';

@Controller('/file')
export class FileController {
  constructor(private readonly FileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string,
  ) {
    return this.FileService.saveFiles([file], folder);
  }

  @Post('vtt')
  @UseInterceptors(FileInterceptor('file'))
  async readVttFile(@UploadedFile() file: Express.Multer.File) {
    return this.FileService.readVttFile(file);
  }
  @Post('translate-vtt')
  @UseInterceptors(FileInterceptor('file'))
  async translate(
    @UploadedFile() file: Express.Multer.File,
    @Query('target_lang') target_lang: string,
  ) {
    const inputPath = `translated/${file.originalname}`;
    const outputPath = inputPath.replace('.vtt', `.${target_lang}.vtt`);
    await writeFile(inputPath, file.buffer);

    await this.FileService.translateVttFile(inputPath, outputPath, target_lang);

    return {
      url: outputPath,
    };
  }
}

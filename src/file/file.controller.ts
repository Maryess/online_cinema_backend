import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFile } from 'fs/promises';
import { path } from 'app-root-path';

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

  @Get('check-translation')
  async checkTranslation(
    @Query('fileName') fileName: string,
    // @Query('target_lang') targetLang: string,
  ) {
    if (!fileName) {
      throw new HttpException(
        'Missing fileName or target_lang',
        HttpStatus.BAD_REQUEST,
      );
    }

    const exists = await this.FileService.checkTranslation(fileName);
    return { exists };
  }

  @Get('translated-list')
  async getAllVtt(@Query('target') target: string) {
    return await this.FileService.getAllVtt(target);
  }

  @Delete('remove-vtt')
  async removeVttFile(@Query('fileName') fileName: string) {
    const fullPath = `${path}/translated/${fileName}`;
    await this.FileService.removeVttFile(fullPath);
    return { message: `File ${fileName} was deleted` };
  }
}

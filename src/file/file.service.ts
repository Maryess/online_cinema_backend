import { Injectable } from '@nestjs/common';
import { FileResponse } from './file.interface';
import { path } from 'app-root-path';
import { ensureDir, writeFile, readFile } from 'fs-extra';
import { exec } from 'child_process';
import { promisify } from 'util';

@Injectable()
export class FileService {
  execAsync = promisify(exec);

  async transcribeAudioToVtt(
    mp3Path: string,
    outputVttPath: string,
  ): Promise<void> {
    try {
      const { stdout, stderr } = await this.execAsync(
        `/Users/user/whisper-env/bin/python3 scripts/whisper_transcribe.py "${mp3Path}" "${outputVttPath}"`,
      );

      if (stderr) {
        console.error('Whisper stderr:', stderr);
      } else {
        console.log('Whisper stdout:', stdout);
      }
    } catch (err) {
      console.error('Whisper error:', err);
      throw new Error('Whisper transcription failed');
    }
  }
  async translateVttFile(
    inputVttPath: string,
    outputVttPath: string,
    targetLang: string,
    sourceLang = 'en',
  ) {
    const sourceArg = sourceLang ? `"${sourceLang}"` : '';
    try {
      const { stdout, stderr } = await this.execAsync(
        `/Users/user/whisper-env/bin/python3 scripts/translate_vtt.py "${inputVttPath}" "${outputVttPath}" "${targetLang}" "${sourceLang}"`,
      );

      if (stderr) console.error('Translation stderr:', stderr);
      else console.log('Translation stdout:', stdout);
    } catch (err) {
      console.error('Translation error:', err);
      throw new Error('VTT translation failed');
    }
  }

  async saveFiles(
    files: Express.Multer.File[],
    folder: string = 'default',
  ): Promise<FileResponse[]> {
    const uploadFolder = `${path}/uploads/${folder}`;
    await ensureDir(uploadFolder);
    const res: FileResponse[] = await Promise.all(
      files.map(async (file) => {
        await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);

        if (
          file.mimetype === 'audio/mpeg' ||
          file.mimetype === 'video/mp4' ||
          file.originalname.endsWith('.mp3') ||
          file.originalname.endsWith('.mp4')
        ) {
          const vttPath = `${uploadFolder}/${file.originalname.replace(/\.[^/.]+$/, '')}.vtt`;
          await this.transcribeAudioToVtt(
            `${uploadFolder}/${file.originalname}`,
            vttPath,
          );
        }

        return {
          url: `/uploads/${folder}/${file.originalname}`,
          name: file.originalname,
        };
      }),
    );

    return res;
  }

  async readVttFile(
    file: Express.Multer.File,
  ): Promise<{ name: string; res: string } | undefined> {
    if (!file) return;
    if (file.mimetype !== 'text/vtt') return;
    const res = file.buffer.toString('utf-8');

    return {
      name: file.originalname,
      res,
    };
  }
}

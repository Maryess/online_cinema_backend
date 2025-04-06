import { Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { register } from 'module';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

}

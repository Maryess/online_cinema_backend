import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserService } from 'src/user/user.service';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async signIn(username: string, password: string) {
    const user = await prisma.user.findUnique;
    // 	if(username && password) {
    // 	await prisma.user.create({
    // 		data:{
    // 			password: password,
    // 			name: username

    // 		}
    // 	})
    // }
    // 	else{
    // 	 'Please, check your email and password'}
  }
}

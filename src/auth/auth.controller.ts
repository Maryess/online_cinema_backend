import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('sign-in')
	async login(@Body() data: AuthDto) {
		return this.authService.auth(data)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('sign-in/access-token')
	async getNewTokens(@Body() data: RefreshTokenDto) {
		return this.authService.getNewTokens(data)
	}

	@UsePipes(new ValidationPipe())
	@Post('sign-up')
	async register(@Body() dto: AuthDto) {
		const oldUser = await this.authService.findByEmail(dto.email)
		if (oldUser)
			throw new BadRequestException(
				'User with this email is already in the system'
			)

		return this.authService.register(dto)
	}
 }

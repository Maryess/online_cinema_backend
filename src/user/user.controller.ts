import { Controller, Get } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('/user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  createUser(): string {
    return this.UserService.createUser();
  }
}

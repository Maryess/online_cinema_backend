import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { User } from "src/user/entity/user.entity";

export class AdminGuard implements CanActivate{
    constructor(private reflector:Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<{user:User}>()
        const user = request.user

        if(!user.isAdmin) throw new ForbiddenException('You have not rights!')

            return user.isAdmin
    }
}
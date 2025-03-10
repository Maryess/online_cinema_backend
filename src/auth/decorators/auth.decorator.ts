import { applyDecorators, UseGuards } from "@nestjs/common";
import { TypeRole } from "../auth.interface";
import { JwtAuthGuard } from "../guards/jwt.guard";
import { AdminGuard } from "../guards/admin.guard";

export const Auth = (role:TypeRole = 'user') => 
    applyDecorators(
        role === 'admin' ?
            UseGuards(JwtAuthGuard, AdminGuard) :
            UseGuards(JwtAuthGuard)
    );
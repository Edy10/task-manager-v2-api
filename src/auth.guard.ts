import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const authorization = request.headers.authorization;

        if (!authorization) {
            throw new UnauthorizedException('Token não informado');
        }

        const token = authorization.split(' ')[1];

        try {
            const payload = await this.jwtService.verifyAsync(token);

            request.usuario = payload;

            return true;
        } catch {
            throw new UnauthorizedException('Token inválido');
        }
    }
}
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request & { user?: any }, _res: Response, next: NextFunction) {
    const auth = req.headers.authorization;
    if (!auth) {
      throw new UnauthorizedException('Token no provisto');
    }

    const parts = String(auth).split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedException('Formato de token inválido');
    }

    const token = parts[1];
    console.log(token);

    try {
      const payload = this.jwtService.verify(token);
      console.log(payload);
      req.user = { id: payload.sub, email: payload.email };
      next();
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}

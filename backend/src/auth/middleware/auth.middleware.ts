import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request & { user?: any }, _res: Response, next: NextFunction) {
    console.log('[AuthMiddleware] start', req.method, req.url, req.headers?.origin);
    const auth = req.headers.authorization;
    console.log('[AuthMiddleware] authorization', auth);

    if (!auth) {
      throw new UnauthorizedException('Token no provisto');
    }

    const parts = String(auth).split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedException('Formato de token inválido');
    }

    const token = parts[1];
    console.log('[AuthMiddleware] token', token);

    try {
      const payload = this.jwtService.verify(token);
      console.log('[AuthMiddleware] payload', payload);
      req.user = { id: payload.sub, email: payload.email };
      console.log('[AuthMiddleware] user', req.user);
      next();
    } catch (err) {
      console.log('[AuthMiddleware] error', err);
      console.error(err);
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}

import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    console.log('[JwtAuthGuard] canActivate', req.method, req.url, req.headers?.authorization);
    return super.canActivate(context) as any;
  }

  handleRequest(err: any, user: any, info: any, context: any, status?: any) {
    console.log('[JwtAuthGuard] handleRequest', { err, user, info });
    if (err || !user) {
      return super.handleRequest(err, user, info, context, status);
    }
    return user;
  }
}

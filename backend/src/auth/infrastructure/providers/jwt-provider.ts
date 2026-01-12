import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtProvider } from '../../application/interfaces/jwt-provider.interface';

export const JWT_PROVIDER = 'JWT_PROVIDER';

@Injectable()
export class JwtProvider implements IJwtProvider {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: any): string {
    return this.jwtService.sign(payload);
  }
}

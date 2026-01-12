import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { IUserRepository, USER_REPOSITORY } from '../../domain/repositories/user.repository';
import { IJwtProvider } from '../interfaces/jwt-provider.interface';
import { JWT_PROVIDER } from '../../infrastructure/providers/jwt-provider';
import { LoginResponse } from '../interfaces/login-response.interface';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(JWT_PROVIDER) private readonly jwtProvider: IJwtProvider,
  ) {}

  public async execute(dto: LoginDto): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(dto.email.toLowerCase());

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const valid = await user.comparePassword(dto.password);

    if (!valid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = this.jwtProvider.sign({ sub: user.id, email: user.email });

    return {
      message: 'Inicio de sesión exitoso',
      token,
    };
  }
}

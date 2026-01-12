import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { IUserRepository, USER_REPOSITORY } from '../../domain/repositories/user.repository';
import { RegisterDto } from '../dto/register.dto';
import { RegisterResponse } from '../interfaces/register-response.interface';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class RegisterUseCase {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

  public async execute(dto: RegisterDto): Promise<RegisterResponse> {
    const existing = await this.userRepository.findByEmail(dto.email.toLowerCase());
    if (existing) {
      throw new ConflictException('Usuario ya existente');
    }

    const user = await User.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });

    await this.userRepository.create(user);

    return { message: 'Usuario registrado exitosamente' };
  }
}

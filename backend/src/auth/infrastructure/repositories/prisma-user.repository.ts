import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const found = await this.prisma.user.findUnique({ where: { email } });
    if (!found) return null;

    return User.fromPrimitives({
      id: found.id,
      name: found.name,
      email: found.email,
      password: found.password,
      createdAt: found.createdAt,
    });
  }

  async create(user: User): Promise<User> {
    const created = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.getHashedPassword(),
      },
    });

    return User.fromPrimitives({
      id: created.id,
      name: created.name,
      email: created.email,
      password: created.password,
      createdAt: created.createdAt,
    });
  }
}

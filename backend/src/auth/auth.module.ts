import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './presentation/controllers/auth.controller';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { PrismaService } from '../prisma.service';
import { JwtProvider, JWT_PROVIDER } from './infrastructure/providers/jwt-provider';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { JwtAuthGuard } from './infrastructure/guards/jwt-auth.guard';
import { AuthMiddleware } from './middleware/auth.middleware';
import { USER_REPOSITORY } from './domain/repositories/user.repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') || 'default_jwt_secret',
        signOptions: { expiresIn: '1h', algorithm: 'HS256' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    RegisterUseCase,
    LoginUseCase,
    PrismaService,
    PrismaUserRepository,
    { provide: USER_REPOSITORY, useClass: PrismaUserRepository },
    { provide: JWT_PROVIDER, useClass: JwtProvider },
    JwtStrategy,
    JwtAuthGuard,
    AuthMiddleware,
  ],
  exports: [JwtAuthGuard, JwtModule, AuthMiddleware, JWT_PROVIDER],
})

export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Example: apply middleware to routes that need it
    // consumer.apply(AuthMiddleware).forRoutes('events');
  }
}
  
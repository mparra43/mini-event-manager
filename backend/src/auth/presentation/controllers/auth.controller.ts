import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { RegisterDto } from '../../application/dto/register.dto';
import { LoginDto } from '../../application/dto/login.dto';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';
import { LoginUseCase } from '../../application/use-cases/login.use-case';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('register')
  @ApiBody({
    description: 'Datos necesarios para registrar un usuario',
    type: RegisterDto,
    examples: {
      example: {
        summary: 'Registro de usuario',
        value: {
          name: 'Lorena Parra',
          email: 'lorena@email.com',
          password: 'Password123!',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuario registrado correctamente',
    example: {
      statusCode: 201,
      user: {
        id: 1,
        name: 'Lorena Parra',
        email: 'lorena@email.com',
      },
    },
  })
  async register(@Body() dto: RegisterDto) {
    const result = await this.registerUseCase.execute(dto);
    return {
      statusCode: HttpStatus.CREATED,
      ...result,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    description: 'Credenciales de acceso',
    type: LoginDto,
    examples: {
      example: {
        summary: 'Login de usuario',
        value: {
          email: 'lorena@email.com',
          password: 'Password123!',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login exitoso',
    example: {
      statusCode: 200,
      accessToken: 'jwt.token.aqui',
    },
  })
  async login(@Body() dto: LoginDto) {
    const result = await this.loginUseCase.execute(dto);
    return {
      statusCode: HttpStatus.OK,
      ...result,
    };
  }
}

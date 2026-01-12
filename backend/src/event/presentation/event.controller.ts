import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/jwt-auth.guard';
import { CreateEventDto } from '../application/dto/create-event.dto';
import { UpdateEventDto } from '../application/dto/update-event.dto';
import { CreateEventUseCase } from '../application/use-cases/create-event.use-case';
import { GetEventsUseCase } from '../application/use-cases/get-events.use-case';
import { GetEventByIdUseCase } from '../application/use-cases/get-event-by-id.use-case';
import { UpdateEventUseCase } from '../application/use-cases/update-event.use-case';
import { DeleteEventUseCase } from '../application/use-cases/delete-event.use-case';

@ApiTags('Events')
@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventController {
  constructor(
    private readonly createEvent: CreateEventUseCase,
    private readonly getEvents: GetEventsUseCase,
    private readonly getEventById: GetEventByIdUseCase,
    private readonly updateEvent: UpdateEventUseCase,
    private readonly deleteEvent: DeleteEventUseCase,
  ) {}

  @Post()
  @ApiBody({
    description: 'Datos para crear un evento',
    type: CreateEventDto,
    examples: {
      example: {
        summary: 'Crear evento',
        value: {
          title: 'NestJS Workshop',
          description: 'Workshop de Clean Architecture con NestJS',
          date: '2026-02-10T15:00:00.000Z',
          location: 'Bogotá',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Evento creado correctamente',
    example: {
      statusCode: 201,
      event: {
        id: 1,
        title: 'NestJS Workshop',
        description: 'Workshop de Clean Architecture con NestJS',
        date: '2026-02-10T15:00:00.000Z',
        location: 'Bogotá',
      },
    },
  })
  async create(@Body() dto: CreateEventDto) {
    const result = await this.createEvent.execute(dto);
    return { statusCode: HttpStatus.CREATED, ...result };
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Listado de eventos',
    example: {
      statusCode: 200,
      events: [
        {
          id: 1,
          title: 'NestJS Workshop',
          description: 'Workshop de Clean Architecture con NestJS',
          date: '2026-02-10T15:00:00.000Z',
          location: 'Bogotá',
        },
      ],
    },
  })
  async findAll() {
    const result = await this.getEvents.execute();
    return { statusCode: HttpStatus.OK, ...result };
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID del evento',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Evento encontrado',
    example: {
      statusCode: 200,
      event: {
        id: 1,
        title: 'NestJS Workshop',
        description: 'Workshop de Clean Architecture con NestJS',
        date: '2026-02-10T15:00:00.000Z',
        location: 'Bogotá',
      },
    },
  })
  async findOne(@Param('id') id: string) {
    const result = await this.getEventById.execute(Number(id));
    return { statusCode: HttpStatus.OK, ...result };
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID del evento a actualizar',
  })
  @ApiBody({
    description: 'Datos para actualizar un evento',
    type: UpdateEventDto,
    examples: {
      example: {
        summary: 'Actualizar evento',
        value: {
          title: 'NestJS Workshop Avanzado',
          description: 'Workshop avanzado de NestJS',
          date: '2026-02-12T16:00:00.000Z',
          location: 'Medellín',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Evento actualizado',
    example: {
      statusCode: 200,
      event: {
        id: 1,
        title: 'NestJS Workshop Avanzado',
        description: 'Workshop avanzado de NestJS',
        date: '2026-02-12T16:00:00.000Z',
        location: 'Medellín',
      },
    },
  })
  async update(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    const result = await this.updateEvent.execute(Number(id), dto);
    return { statusCode: HttpStatus.OK, ...result };
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID del evento a eliminar',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Evento eliminado',
    example: {
      statusCode: 200,
      message: 'Evento eliminado correctamente',
    },
  })
  async remove(@Param('id') id: string) {
    const result = await this.deleteEvent.execute(Number(id));
    return { statusCode: HttpStatus.OK, ...result };
  }
}

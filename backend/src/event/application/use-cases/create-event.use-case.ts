import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { IEventRepository, EVENT_REPOSITORY } from '../../domain/repositories/event.repository';
import { CreateEventDto } from '../dto/create-event.dto';
import { Event } from '../../domain/entities/event.entity';
import { CreateEventResponse } from '../interfaces/event-response.interfaces';

@Injectable()
export class CreateEventUseCase {
  constructor(@Inject(EVENT_REPOSITORY) private readonly eventRepository: IEventRepository) {}

  public async execute(dto: CreateEventDto): Promise<CreateEventResponse> {
    try {
      const event = Event.create({
        name: dto.name,
        date: dto.date,
        description: dto.description,
        place: dto.place,
      });

      const created = await this.eventRepository.create(event);

      return { message: 'Evento creado correctamente', event: created.toJSON() };
    } catch (err) {
      throw new BadRequestException(err.message || 'Datos inválidos');
    }
  }
}

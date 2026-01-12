import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IEventRepository, EVENT_REPOSITORY } from '../../domain/repositories/event.repository';
import { GetEventResponse } from '../interfaces/event-response.interfaces';

@Injectable()
export class GetEventByIdUseCase {
  constructor(@Inject(EVENT_REPOSITORY) private readonly eventRepository: IEventRepository) {}

  public async execute(id: number): Promise<GetEventResponse> {
    const event = await this.eventRepository.findById(id);
    if (!event) {
      throw new NotFoundException('Evento no encontrado');
    }

    return { event: event.toJSON() };
  }
}

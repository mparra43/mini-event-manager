import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IEventRepository, EVENT_REPOSITORY } from '../../domain/repositories/event.repository';
import { DeleteEventResponse } from '../interfaces/delete-event-response.interface';

@Injectable()
export class DeleteEventUseCase {
  constructor(@Inject(EVENT_REPOSITORY) private readonly eventRepository: IEventRepository) {}

  public async execute(id: number): Promise<DeleteEventResponse> {
    const existing = await this.eventRepository.findById(id);
    if (!existing) throw new NotFoundException('Evento no encontrado');

    await this.eventRepository.delete(id);

    return { message: 'Evento eliminado correctamente' };
  }
}

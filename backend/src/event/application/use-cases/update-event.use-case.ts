import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { UpdateEventDto } from '../dto/update-event.dto';
import { IEventRepository, EVENT_REPOSITORY } from '../../domain/repositories/event.repository';
import { UpdateEventResponse } from '../interfaces/event-response.interfaces';
import { Event } from '../../domain/entities/event.entity';

@Injectable()
export class UpdateEventUseCase {
  constructor(@Inject(EVENT_REPOSITORY) private readonly eventRepository: IEventRepository) {}

  public async execute(id: number, dto: UpdateEventDto): Promise<UpdateEventResponse> {
    const existing = await this.eventRepository.findById(id);
    if (!existing) throw new NotFoundException('Evento no encontrado');

    // Merge and validate using Event.create (note: create validates required fields, so only validate fields provided)
    try {
      const merged = Event.fromPrimitives({
        id: existing.id,
        name: dto.name ?? existing.name,
        date: dto.date ?? existing.date,
        description: dto.description ?? existing.description,
        place: dto.place ?? existing.place,
        createdAt: existing.createdAt,
        updatedAt: existing.updatedAt,
      });

      // Validate using create constraints for required fields
      // We call Event.create to check invariants; since it requires name and date, they're present
      const validated = Event.create({
        id: merged.id,
        name: merged.name,
        date: merged.date,
        description: merged.description ?? undefined,
        place: merged.place ?? undefined,
      });

      const updated = await this.eventRepository.update(id, validated);
      return { message: 'Evento actualizado correctamente', event: updated.toJSON() };
    } catch (err) {
      throw new BadRequestException(err.message || 'Datos inválidos');
    }
  }
}

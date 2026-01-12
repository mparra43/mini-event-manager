import { Injectable, Inject } from '@nestjs/common';
import { IEventRepository, EVENT_REPOSITORY } from '../../domain/repositories/event.repository';
import { GetEventsResponse } from '../interfaces/event-response.interfaces';

@Injectable()
export class GetEventsUseCase {
  constructor(@Inject(EVENT_REPOSITORY) private readonly eventRepository: IEventRepository) {}

  public async execute(): Promise<GetEventsResponse> {
    const events = await this.eventRepository.findAll();
    return { events: events.map((e) => e.toJSON()) };
  }
}

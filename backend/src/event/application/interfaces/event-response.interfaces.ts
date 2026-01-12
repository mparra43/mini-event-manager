import { Event } from '../../domain/entities/event.entity';

export interface CreateEventResponse {
  message: 'Evento creado correctamente';
  event: ReturnType<Event['toJSON']>;
}

export interface GetEventsResponse {
  events: ReturnType<Event['toJSON']>[];
}

export interface GetEventResponse {
  event: ReturnType<Event['toJSON']>;
}

export interface UpdateEventResponse {
  message: 'Evento actualizado correctamente';
  event: ReturnType<Event['toJSON']>;
}

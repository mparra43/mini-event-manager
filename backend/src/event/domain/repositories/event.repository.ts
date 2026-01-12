import { Event } from '../entities/event.entity';

export const EVENT_REPOSITORY = 'EVENT_REPOSITORY';

export interface IEventRepository {
  create(event: Event): Promise<Event>;
  findAll(): Promise<Event[]>;
  findById(id: number): Promise<Event | null>;
  update(id: number, event: Event): Promise<Event>;
  delete(id: number): Promise<void>;
}

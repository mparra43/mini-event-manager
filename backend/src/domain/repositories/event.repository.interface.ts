import { Event } from '../entities/event.entity';

export interface IEventRepository {
  create(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event>;
  findAll(): Promise<Event[]>;
  findById(id: number): Promise<Event | null>;
  update(id: number, event: Partial<Event>): Promise<Event>;
  delete(id: number): Promise<void>;
}

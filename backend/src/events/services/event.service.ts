import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import type { IEventRepository } from '../../domain/repositories/event.repository.interface';
import { Event } from '../../domain/entities/event.entity';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository,
  ) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    try {
      const eventDate = new Date(createEventDto.date);

      if (isNaN(eventDate.getTime())) {
        throw new BadRequestException('Invalid date format');
      }

      return await this.eventRepository.create({
        name: createEventDto.name,
        date: eventDate,
        description: createEventDto.description,
        place: createEventDto.place,
      });
    } catch (error) {
      throw new BadRequestException('Failed to create event');
    }
  }

  async getAllEvents(): Promise<Event[]> {
    return await this.eventRepository.findAll();
  }

  async getEventById(id: number): Promise<Event> {
    const event = await this.eventRepository.findById(id);

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  async updateEvent(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const existingEvent = await this.eventRepository.findById(id);

    if (!existingEvent) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    try {
      const updateData: Partial<Event> = {};

      if (updateEventDto.name !== undefined) {
        updateData.name = updateEventDto.name;
      }

      if (updateEventDto.date !== undefined) {
        const eventDate = new Date(updateEventDto.date);
        if (isNaN(eventDate.getTime())) {
          throw new BadRequestException('Invalid date format');
        }
        updateData.date = eventDate;
      }

      if (updateEventDto.description !== undefined) {
        updateData.description = updateEventDto.description;
      }

      if (updateEventDto.place !== undefined) {
        updateData.place = updateEventDto.place;
      }

      return await this.eventRepository.update(id, updateData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to update event');
    }
  }

  async deleteEvent(id: number): Promise<void> {
    const event = await this.eventRepository.findById(id);

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    await this.eventRepository.delete(id);
  }
}

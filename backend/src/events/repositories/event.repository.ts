import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';
import { IEventRepository } from '../../domain/repositories/event.repository.interface';
import { Event } from '../../domain/entities/event.entity';

@Injectable()
export class EventRepository implements IEventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Event> {
    const createdEvent = await this.prisma.event.create({
      data: {
        name: eventData.name,
        date: eventData.date,
        description: eventData.description,
        place: eventData.place,
      },
    });

    return this.mapToDomain(createdEvent);
  }

  async findAll(): Promise<Event[]> {
    const events = await this.prisma.event.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return events.map((event) => this.mapToDomain(event));
  }

  async findById(id: number): Promise<Event | null> {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    return event ? this.mapToDomain(event) : null;
  }

  async update(id: number, eventData: Partial<Event>): Promise<Event> {
    const updatedEvent = await this.prisma.event.update({
      where: { id },
      data: {
        name: eventData.name,
        date: eventData.date,
        description: eventData.description,
        place: eventData.place,
      },
    });

    return this.mapToDomain(updatedEvent);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.event.delete({
      where: { id },
    });
  }

  private mapToDomain(prismaEvent: any): Event {
    return new Event(
      prismaEvent.id,
      prismaEvent.name,
      prismaEvent.date,
      prismaEvent.description,
      prismaEvent.place,
      prismaEvent.createdAt,
      prismaEvent.updatedAt,
    );
  }
}

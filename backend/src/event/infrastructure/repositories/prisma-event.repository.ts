import { Injectable } from '@nestjs/common';
import { IEventRepository } from '../../domain/repositories/event.repository';
import { Event } from '../../domain/entities/event.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PrismaEventRepository implements IEventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(event: Event): Promise<Event> {
    const created = await this.prisma.event.create({
      data: {
        name: event.name,
        date: event.date,
        description: event.description ?? null,
        place: event.place ?? null,
        updatedAt: new Date(),
      },
    });

    return Event.fromPrimitives({
      id: created.id,
      name: created.name,
      date: created.date,
      description: created.description,
      place: created.place,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
  }

  async findAll(): Promise<Event[]> {
    const found = await this.prisma.event.findMany({ orderBy: { id: 'asc' } });
    return found.map((f) =>
      Event.fromPrimitives({
        id: f.id,
        name: f.name,
        date: f.date,
        description: f.description,
        place: f.place,
        createdAt: f.createdAt,
        updatedAt: f.updatedAt,
      }),
    );
  }

  async findById(id: number): Promise<Event | null> {
    const found = await this.prisma.event.findUnique({ where: { id } });
    if (!found) return null;

    return Event.fromPrimitives({
      id: found.id,
      name: found.name,
      date: found.date,
      description: found.description,
      place: found.place,
      createdAt: found.createdAt,
      updatedAt: found.updatedAt,
    });
  }

  async update(id: number, event: Event): Promise<Event> {
    const updated = await this.prisma.event.update({
      where: { id },
      data: {
        name: event.name,
        date: event.date,
        description: event.description ?? null,
        place: event.place ?? null,
        updatedAt: new Date(),
      },
    });

    return Event.fromPrimitives({
      id: updated.id,
      name: updated.name,
      date: updated.date,
      description: updated.description,
      place: updated.place,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.event.delete({ where: { id } });
  }
}

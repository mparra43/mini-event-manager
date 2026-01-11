import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { EventService } from '../services/event.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Event } from '../../domain/entities/event.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return await this.eventService.createEvent(createEventDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllEvents(): Promise<Event[]> {
    return await this.eventService.getAllEvents();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getEventById(@Param('id', ParseIntPipe) id: number): Promise<Event> {
    return await this.eventService.getEventById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateEvent(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    return await this.eventService.updateEvent(id, updateEventDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEvent(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.eventService.deleteEvent(id);
  }
}

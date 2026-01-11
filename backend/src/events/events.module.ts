import { Module } from '@nestjs/common';
import { EventController } from './controllers/event.controller';
import { EventService } from './services/event.service';
import { EventRepository } from './repositories/event.repository';
import { PrismaService } from '../common/services/prisma.service';
import { IEventRepository } from '../domain/repositories/event.repository.interface';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [EventController],
  providers: [
    EventService,
    {
      provide: 'IEventRepository',
      useClass: EventRepository,
    },
    PrismaService,
  ],
  exports: [EventService],
})
export class EventsModule {}

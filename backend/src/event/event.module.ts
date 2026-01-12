import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { EventController } from './presentation/event.controller';
import { CreateEventUseCase } from './application/use-cases/create-event.use-case';
import { GetEventsUseCase } from './application/use-cases/get-events.use-case';
import { GetEventByIdUseCase } from './application/use-cases/get-event-by-id.use-case';
import { UpdateEventUseCase } from './application/use-cases/update-event.use-case';
import { DeleteEventUseCase } from './application/use-cases/delete-event.use-case';
import { PrismaService } from '../prisma.service';
import { PrismaEventRepository } from './infrastructure/repositories/prisma-event.repository';
import { EVENT_REPOSITORY } from './domain/repositories/event.repository';
import { AuthModule } from '../auth/auth.module';
import { AuthMiddleware } from '../auth/middleware/auth.middleware';

@Module({
  imports: [AuthModule],
  controllers: [EventController],
  providers: [
    CreateEventUseCase,
    GetEventsUseCase,
    GetEventByIdUseCase,
    UpdateEventUseCase,
    DeleteEventUseCase,
    PrismaService,
    PrismaEventRepository,
    { provide: EVENT_REPOSITORY, useClass: PrismaEventRepository },
  ],
})
export class EventModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(EventController);
  }
}

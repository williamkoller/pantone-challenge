import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { GlobalModule } from './shared/global.module';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';
import { HealthCheckModule } from './presentation/modules/health-check/health-check.module';
import { DomainEvents } from './shared/domain/events/DomainEvents';
import { ProducerModule } from './presentation/modules/producer/producer.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    GlobalModule,
    HealthCheckModule,
    ProducerModule,
  ],
  controllers: [],
  providers: [DomainEvents],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

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
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ProducerModule } from './presentation/modules/producer/producer.module';
import { FarmModule } from './presentation/modules/farm/farm.module';
import { CropModule } from './presentation/modules/crop/crop.module';
import { FarmCropModule } from './presentation/modules/farm-crop/farm-crop.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    GlobalModule,
    HealthCheckModule,
    ProducerModule,
    FarmModule,
    CropModule,
    FarmCropModule,
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

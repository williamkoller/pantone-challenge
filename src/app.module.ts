import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { GlobalModule } from './shared/global.module';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';
import { HealthCheckModule } from './presentation/modules/health-check/health-check.module';
import { DomainEvents } from '@app/shared/domain/events/domain-events/domain-events';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from './presentation/modules/user/user.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    GlobalModule,
    HealthCheckModule,
    UserModule,
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

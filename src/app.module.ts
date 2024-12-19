import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { GlobalModule } from './shared/global.module';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';
import { HealthCheckModule } from './shared/ioc/health-check/health-check.module';

@Module({
  imports: [GlobalModule, HealthCheckModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

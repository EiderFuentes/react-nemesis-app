import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModulesModule } from './modules/modules.module';
import { LoggerInterceptor } from './modules/common/interceptors/logger.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';


@Module({
  imports: [ModulesModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ]
})
export class AppModule { }

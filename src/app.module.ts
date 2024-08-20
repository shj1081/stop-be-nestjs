  import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerContextMiddleware } from './common/middleware/logger.middleware';
import { AppConfigModule } from './config/app/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { NoticeModule } from './modules/notice/notice.module';

  @Module({
  imports: [AppConfigModule, AuthModule, NoticeModule, JwtModule.register({})],
    controllers: [AppController],
    providers: [AppService, Logger],
  })
  export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(LoggerContextMiddleware)
        .forRoutes('*');    
    }
  }
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MultiTenantMiddleware } from "./multi-tenant/multi-tenant.middleware";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";

import { CommonModule } from "./common/common.module";
import { MultiTenantModule } from "./multi-tenant/multi-tenant.module";
import multiTenantConfig from "./multi-tenant/multi-tenant.config";
import { RequestResponseInterceptor } from "./logger/request-response.interceptor";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ChatModule } from "./chat/chat.module";

@Module({
  imports: [
    AuthModule,
    ChatModule,
    CommonModule,
    MultiTenantModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [multiTenantConfig],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MultiTenantMiddleware).forRoutes("*");
  }
}

import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MultiTenantMiddleware } from "./multi-tenant/multi-tenant.middleware";
import { ClientsModule } from "@nestjs/microservices";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";

import { CommonModule } from "./common/common.module";
import { ChatGateway } from "./chat/chat.gateway";
import { MultiTenantModule } from "./multi-tenant/multi-tenant.module";
import { ChatService } from "./chat/chat.service";
import { ChatController } from "./chat/chat.controller";
import { kafkaConfig } from "./kafka/kafka.config";
import multiTenantConfig from "./multi-tenant/multi-tenant.config";
import { RequestResponseInterceptor } from "./logger/request-response.interceptor";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ClientsModule.register([kafkaConfig]),
    CommonModule,
    MultiTenantModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [multiTenantConfig],
    }),
  ],
  controllers: [AppController, ChatController],
  providers: [
    AppService,
    ChatGateway,
    ChatService,
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

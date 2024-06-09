import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ChatController } from "./chat/chat.controller";
import { ChatGateway } from "./chat/chat.gateway";
import { ChatService } from "./chat/chat.service";
import { kafkaConfig } from "./kafka/kafka.config";

@Module({
  imports: [ClientsModule.register([kafkaConfig])],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class AppModule {}

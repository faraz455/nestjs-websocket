import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { KafkaModule } from "../kafka/kafka.module";
// import { ChatGateway } from "./chat.gateway";
import { ChatController } from "./chat.controller";

@Module({
  imports: [KafkaModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}

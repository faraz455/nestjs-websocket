import { Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { Inject } from "@nestjs/common/decorators";

@Injectable()
export class ChatService implements OnModuleInit {
  constructor(
    @Inject("KAFKA_SERVICE") private readonly kafkaService: ClientKafka
  ) {}

  async onModuleInit() {
    this.kafkaService.subscribeToResponseOf("chat-topic");
    await this.kafkaService.connect();
  }

  async sendMessage(message: string) {
    await this.kafkaService.emit("chat-topic", { message });
  }
}

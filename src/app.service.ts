import { Injectable } from "@nestjs/common";
import { ProducerService } from "./kafka/producer.service";

@Injectable()
export class AppService {
  constructor(private readonly producerService: ProducerService) {}

  async getHello() {
    await this.producerService.produce({
      topic: "test", // changed to "test" to match the consumer
      messages: [
        {
          value: "HELLO WORLD",
        },
      ],
    });
  }
}

import { ClientProviderOptions, Transport } from "@nestjs/microservices";

export const kafkaConfig: ClientProviderOptions = {
  name: "KAFKA_SERVICE",
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ["localhost:9092"],
      clientId: "nestjs-consumer-client",
      retry: {
        retries: 10, // Number of retries
      },
    },
    consumer: {
      groupId: "chat-group",
      sessionTimeout: 30000, // Session timeout in milliseconds
    },
  },
};

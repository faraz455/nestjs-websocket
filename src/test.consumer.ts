// import { Injectable, OnModuleInit } from "@nestjs/common";
// import { ConsumerService } from "./kafka/consumer.service";

// @Injectable()
// export class TestConsumer implements OnModuleInit {
//   constructor(private readonly consumerService: ConsumerService) {}

//   async onModuleInit() {
//     await this.consumerService.consume(
//       {
//         topics: ["chat"],
//       },
//       {
//         eachMessage: async ({ topic, message, partition }) => {
//           console.log({
//             value: message.value.toString(),
//             topic: topic.toString(),
//             partition: partition.toString(),
//           });
//         },
//       }
//     );
//   }
// }

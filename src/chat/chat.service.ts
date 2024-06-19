import { Injectable, OnModuleInit } from "@nestjs/common";
import { Inject } from "@nestjs/common/decorators";
import { PRISMA_SERVICE } from "src/multi-tenant/multi-tenant.module";
import { PrismaService } from "src/prisma/prisma.service";
import { MakeTimedIDUnique, datesForCreate } from "src/common/common.helper";

@Injectable()
export class ChatService {
  constructor(@Inject(PRISMA_SERVICE) private readonly prisma: PrismaService) {}

  async sendMessage(data: {
    userId: string;
    fullName: string;
    message: string;
  }) {
    await this.prisma.message.create({
      data: {
        messageId: MakeTimedIDUnique(),
        senderId: data.userId,
        messageText: data.message,
        ...datesForCreate(),
      },
    });
  }

  async getMessage() {
    const recs = await this.prisma.message.findMany({
      select: {
        sender: {
          select: {
            fullName: true,
          },
        },
        messageText: true,
      },
    });

    const records = recs.map((rec) => {
      return {
        fullName: rec.sender.fullName,
        message: rec.messageText,
      };
    });

    return { records };
  }
}

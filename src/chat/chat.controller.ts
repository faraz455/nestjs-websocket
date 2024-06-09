import { Controller, Post, Body } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { MessageDto } from "./dto/message.dto";
import { ChatGateway } from "./chat.gateway";

@Controller("chat")
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatGateway: ChatGateway
  ) {}

  @Post("send")
  async sendMessage(@Body() message: MessageDto) {
    await this.chatService.sendMessage(message.message);
    this.chatGateway.server.emit("message", message);
    return { status: "Message sent" };
  }
}

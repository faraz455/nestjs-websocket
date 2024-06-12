import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatGateway } from "./chat.gateway";
import { MessageDto } from "./dto/message.dto";
import { GetUser } from "../auth/decorators/get-user.decorator";
import { NewJwtGuard } from "src/auth/guards/new-jwt.guard";
import { Profile } from "src/auth/dto";

@Controller("chat")
@UseGuards(NewJwtGuard)
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatGateway: ChatGateway
  ) {}

  @Post("send")
  async sendMessage(
    @Body() message: MessageDto,
    @GetUser("profile") profile: Profile
  ) {
    const fullMessage = {
      fullName: profile.fullName,
      message: message.message,
      userId: profile.userId,
    };

    console.log(fullMessage);
    await this.chatService.sendMessage(fullMessage);
    this.chatGateway.server.emit("message", fullMessage);
    return { status: "Message sent" };
  }
}

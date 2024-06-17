import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log("WebSocket Initialized");
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log("Client connected:", client.id);
  }

  handleDisconnect(client: Socket) {
    console.log("Client disconnected:", client.id);
  }

  @SubscribeMessage("sendMessage")
  handleMessage(
    client: Socket,
    payload: { message: string; fullName: string }
  ): void {
    this.server.emit("message", payload); // Broadcast message to all connected clients
  }
}

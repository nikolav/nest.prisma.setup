import { Global, Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ClientEvent, ServerEvent } from './event';
//
@Global()
@WebSocketGateway()
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger: Logger = new Logger('App');
  @WebSocketServer() io: Server;
  // this.io.emit('<event>', '<message>');
  //
  afterInit(server: Server) {
    this.logger.log(`io/started`);
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`io/connection: [${client.id}]`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`io/disconnected: [${client.id}]`);
  }
  //
  @SubscribeMessage(ClientEvent.MESSAGE)
  handleMessage(client: Socket, payload: string): WsResponse<string> {
    return {
      event: ServerEvent.MESSAGE,
      data: `${client.id}: ${payload}`,
    };
  }
}

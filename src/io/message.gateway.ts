import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ClientEvent, ServerEvent } from './event';
//
@WebSocketGateway({ transports: ['websocket'] })
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger: Logger = new Logger('App');
  // @WebSocketServer() io: Server;
  io: Server;
  // this.io.emit('<event>', '<message>');
  //
  afterInit(server: Server) {
    this.io = server;
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
  //
  @SubscribeMessage('test')
  handleMessageTest(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: string,
  ): WsResponse<string> {
    // handleMessageTest(client: Socket, payload: string): WsResponse<string> {
    console.log({ payload });
    return {
      event: ServerEvent.TEST,
      data: `${payload} --test`,
    };
  }
}

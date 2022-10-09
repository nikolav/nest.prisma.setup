import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WsResponse } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
export declare class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger;
    io: Server;
    afterInit(server: Server): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): void;
    handleMessage(client: Socket, payload: string): WsResponse<string>;
    handleMessageTest(client: Socket, payload: string): WsResponse<string>;
}

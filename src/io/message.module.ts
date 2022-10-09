import { Module, Global } from '@nestjs/common';
import { MessageGateway } from './message.gateway';

@Global()
@Module({
  providers: [MessageGateway],
  exports: [MessageGateway],
})
export class MessageModule {}

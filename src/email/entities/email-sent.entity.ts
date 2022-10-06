import { ApiProperty } from '@nestjs/swagger';
import { assign } from 'lodash';
//
export class EmailSentEntity {
  @ApiProperty()
  messageId: string;

  constructor(partial: Partial<EmailSentEntity>) {
    assign(this, { messageId: partial.messageId });
  }
}

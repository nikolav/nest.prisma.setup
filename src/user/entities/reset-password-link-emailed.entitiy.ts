import { ApiProperty } from '@nestjs/swagger';
import { assign } from 'lodash';

export class ResetPasswordLinkEmailedEntitiy {
  @ApiProperty()
  email: string;

  @ApiProperty()
  messageId: string;

  constructor(d: Partial<ResetPasswordLinkEmailedEntitiy>) {
    assign(this, { email: d.email, messageId: d.messageId });
  }
}

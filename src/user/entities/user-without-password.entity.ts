import { User } from '@prisma/client';
import { assign } from 'lodash';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
//
export class UserWithoutPasswordEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  email: string;

  @Exclude()
  passwordHash: string;

  constructor(d: Partial<User>) {
    assign(this, d);
  }
}

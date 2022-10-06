import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  // Transform,
  Exclude,
} from 'class-transformer';
//
export class AuthEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  email: string;

  // @Transform((value) => value.transformed())
  @Exclude()
  passwordHash: string;

  @ApiProperty({ required: false })
  token?: string;

  @ApiProperty({ required: false })
  refershToken?: string;

  // to transform fields instantiate records
  // .. new AuthEntity(<record>);
  constructor(partial: Partial<AuthEntity>) {
    Object.assign(this, partial);
  }
}

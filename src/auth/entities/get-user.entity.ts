import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  // Transform,
  Exclude,
} from 'class-transformer';
//
export class GetUserEntity implements User {
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

  constructor(partial: Partial<GetUserEntity>) {
    Object.assign(this, partial);
  }
}

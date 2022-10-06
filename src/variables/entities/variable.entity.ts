import { Main } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
// import { Transform } from 'class-transformer';
//
export class VariableEntity implements Main {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  // @Transform((value) => value.transformed())
  @ApiProperty({ required: false, nullable: true })
  value: string;

  @ApiProperty({ required: false, nullable: true })
  description: string;

  // to transform fields instantiate records
  // .. new VariableEntity(<record>);
  constructor(partial: Partial<VariableEntity>) {
    Object.assign(this, partial);
  }
}

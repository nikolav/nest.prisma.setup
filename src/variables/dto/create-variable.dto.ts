import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateVariableDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty({ required: false })
  value: string;

  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;
}

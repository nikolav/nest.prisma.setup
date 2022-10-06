import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
//
export class EmailPlainTextDto {
  // list of receivers
  @IsEmail()
  @ApiProperty()
  to: string;
  // sender address
  @IsEmail()
  @ApiProperty()
  from: string;
  // Subject line
  @IsNotEmpty()
  @ApiProperty()
  subject: string;
  // plaintext body
  @IsNotEmpty()
  @ApiProperty()
  message: string;
}

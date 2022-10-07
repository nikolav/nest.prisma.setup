import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PasswordResetDto {
  @IsEmail()
  @ApiProperty()
  email: string;
}

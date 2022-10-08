import { PasswordResetDto } from './password-reset.dto';
import { IsNotEmpty, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'


export class PasswordResetBodyDto {
  
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  token: string;
}
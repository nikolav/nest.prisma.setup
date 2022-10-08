import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { PasswordResetDto, PasswordResetBodyDto } from './dto';
import {
  ResetPasswordLinkEmailedEntitiy,
  UserWithoutPasswordEntity,
} from './entities';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly serviceUser: UserService) {}
  // no jwt check here; can reset forgot-password
  // reset password steps
  //  - user requests reset; sends post request with email
  //  - if user found, mail them link with password-reset token attached
  //  - user sends get-request to `edit-password` page; token sent along
  //  - when form submited, app makes post request to `/users/password-reset`; password and token attached @body
  //  - if token valid, update password
  @Post('send-password-reset-link')
  async sendPasswordResetLink(@Body() data: PasswordResetDto) {
    return new ResetPasswordLinkEmailedEntitiy(
      await this.serviceUser.sendPasswordResetLink(data),
    );
  }
  // 
  @Post('password-reset')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  async passwordUpdate(@Body() data: PasswordResetBodyDto) {
    return new UserWithoutPasswordEntity(
      await this.serviceUser.passwordUpdate(data),
    );
  }
}

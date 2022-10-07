import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { PasswordResetDto } from './dto';
import { ResetPasswordLinkEmailedEntitiy } from './entities';
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
  @ApiCreatedResponse()
  async sendPasswordResetLink(@Body() data: PasswordResetDto) {
    return new ResetPasswordLinkEmailedEntitiy(
      await this.serviceUser.sendPasswordResetLink(data),
    );
  }

  @Post('password-reset')
  passwordUpdate() {
    throw new Error('not implemented');
  }
}

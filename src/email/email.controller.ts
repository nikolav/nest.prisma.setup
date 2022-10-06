import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EmailService } from './email.service';
import { EmailPlainTextDto } from './dto';
import { HtmlEscapeValidationPipe } from '../pipes';
import { EmailSentEntity } from './entities';
import { JwtGuard } from '../auth/guard/jwt.guard';
// import { AllowRoles } from '../auth/allow-roles';
// import { RolesGuard } from '../auth/guard';

@Controller('email')
@UseGuards(JwtGuard)
// @UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  //
  @Post('plaintext')
  // @AllowRoles('admin')
  // @AllowRoles()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: EmailSentEntity })
  async plaintext(
    @Body(new HtmlEscapeValidationPipe(['message']))
    emailData: EmailPlainTextDto,
  ): Promise<EmailSentEntity> {
    return new EmailSentEntity(await this.emailService.plaintext(emailData));
  }
}

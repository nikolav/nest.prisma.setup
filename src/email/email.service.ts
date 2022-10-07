import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailPlainTextDto } from './dto';
import { type UserWithPasswordResetToken } from './dto/email-password-reset.d';
import { ConfigService } from '@nestjs/config';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailer: MailerService,
    private readonly config: ConfigService,
    private readonly utils: UtilsService,
  ) {}
  //
  sendMailPasswordResetLink({ email, token }: UserWithPasswordResetToken) {
    const domain = this.utils.stripEndSlashes(this.config.get('API_DOMAIN'));
    const link = `${domain}/users/edit-password?token=${token}`;
    //
    return this.mailer.sendMail({
      to: email,
      subject: 'password reset @nikolav.rs',
      template: 'password-reset/message',
      context: { link },
    });
  }
  //
  plaintext({
    to = 'admin@nikolav.rs',
    from = 'admin@nikolav.rs',
    subject = 'NestJS MailerModule ✔',
    message = 'message --test',
  }: EmailPlainTextDto) {
    return this.mailer.sendMail({
      to,
      from,
      subject,
      // text: message,
      // html: `<p>${message}</p>`,
      template: 'promo/message',
      context: { message, link: 'https://nikolav.rs/' },
    });
  }
}

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailPlainTextDto } from './dto';

@Injectable()
export class EmailService {
  constructor(private readonly mailer: MailerService) {}
  //
  plaintext({
    to = 'admin@nikolav.rs',
    from = 'noreply@nestjs-nodemailer.com',
    subject = 'NestJS MailerModule ✔',
    message = 'message@nestjs.nodemailer',
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

  // async sendUserConfirmation(user: User, token: string) {
  //   const url = `example.com/auth/confirm?token=${token}`;

  //   await this.mailerService.sendMail({
  //     to: user.email,
  //     // from: '"Support Team" <support@example.com>', // override default from
  //     subject: 'Welcome to Nice App! Confirm your Email',
  //     template: './confirmation', // `.hbs` extension is appended automatically
  //     context: { // ✏️ filling curly brackets with content
  //       name: user.name,
  //       url,
  //     },
  //   });
  // }
}

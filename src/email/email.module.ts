import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join as pathJoin } from 'path';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
// import { AuthModule } from '../auth/auth.module';
//
@Global()
@Module({
  imports: [
    // AuthModule,
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        // transport: config.get('EMAIL_TRANSPORT'),
        transport: {
          host: config.get('EMAIL_HOST'),
          secure: false,
          port: config.get('EMAIL_PORT'),
          auth: {
            user: config.get('EMAIL_USERNAME'),
            pass: config.get('EMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: '"noreply.app" <noreply@nikolav.rs>',
        },
        template: {
          dir: pathJoin(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
            rejectUnauthorized: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
//
export class EmailModule {}

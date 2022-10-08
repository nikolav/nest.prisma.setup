import { MailerService } from '@nestjs-modules/mailer';
import { EmailPlainTextDto } from './dto';
import { type UserWithPasswordResetToken } from './dto/email-password-reset.d';
import { ConfigService } from '@nestjs/config';
import { UtilsService } from '../utils/utils.service';
export declare class EmailService {
    private readonly mailer;
    private readonly config;
    private readonly utils;
    constructor(mailer: MailerService, config: ConfigService, utils: UtilsService);
    sendMailPasswordResetLink({ email, token }: UserWithPasswordResetToken): Promise<any>;
    plaintext({ to, from, subject, message, }: EmailPlainTextDto): Promise<any>;
}

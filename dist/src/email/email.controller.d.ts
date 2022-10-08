import { EmailService } from './email.service';
import { EmailPlainTextDto } from './dto';
import { EmailSentEntity } from './entities';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    plaintext(emailData: EmailPlainTextDto): Promise<EmailSentEntity>;
}

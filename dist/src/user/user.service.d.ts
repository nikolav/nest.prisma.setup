import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PasswordResetBodyDto, PasswordResetDto } from './dto';
import { EmailService } from '../email/email.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class UserService {
    private readonly mailer;
    private readonly prisma;
    private readonly config;
    private readonly jwt;
    constructor(mailer: EmailService, prisma: PrismaService, config: ConfigService, jwt: JwtService);
    sendPasswordResetLink(data: PasswordResetDto): Promise<any>;
    withPasswordResetToken(user: User): any;
    passwordUpdate({ password, token }: PasswordResetBodyDto): Promise<User>;
}

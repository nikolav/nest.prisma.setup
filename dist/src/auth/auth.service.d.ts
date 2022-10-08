import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterUserDto } from './dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    private readonly config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    register({ email, password }: RegisterUserDto): Promise<User>;
    authenticate({ email, password }: RegisterUserDto): Promise<User>;
    withTokens(user: User): Promise<User>;
    matchesRoles(user: User, roles: string[]): Promise<boolean>;
    getUserRoles(user: User): Promise<any>;
}

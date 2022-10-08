import { User } from '@prisma/client';
export declare class AuthEntity implements User {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    passwordHash: string;
    token?: string;
    refershToken?: string;
    constructor(partial: Partial<AuthEntity>);
}

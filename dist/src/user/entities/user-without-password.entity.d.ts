import { User } from '@prisma/client';
export declare class UserWithoutPasswordEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    passwordHash: string;
    constructor(d: Partial<User>);
}

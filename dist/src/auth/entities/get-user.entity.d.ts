import { User } from '@prisma/client';
export declare class GetUserEntity implements User {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    passwordHash: string;
    constructor(partial: Partial<GetUserEntity>);
}

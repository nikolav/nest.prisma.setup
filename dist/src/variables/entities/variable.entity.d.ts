import { Main } from '@prisma/client';
export declare class VariableEntity implements Main {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    value: string;
    description: string;
    constructor(partial: Partial<VariableEntity>);
}

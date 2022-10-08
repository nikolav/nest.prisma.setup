import { CreateVariableDto } from './dto/create-variable.dto';
import { UpdateVariableDto } from './dto/update-variable.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class VariablesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createVariableDto: CreateVariableDto): import(".prisma/client").Prisma.Prisma__MainClient<import(".prisma/client").Main, never>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Main[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__MainClient<import(".prisma/client").Main, never>;
    update(id: string, updateVariableDto: UpdateVariableDto): import(".prisma/client").Prisma.Prisma__MainClient<import(".prisma/client").Main, never>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__MainClient<import(".prisma/client").Main, never>;
    findOneByName(name: string): import(".prisma/client").Prisma.Prisma__MainClient<import(".prisma/client").Main, never>;
}

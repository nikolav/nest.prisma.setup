import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { UtilsService } from '../utils/utils.service';
export declare class PrismaService extends PrismaClient {
    private readonly config;
    private readonly utils;
    constructor(config: ConfigService, utils: UtilsService);
}

import { ConfigService } from '@nestjs/config';
export declare class UtilsService {
    private readonly config;
    constructor(config: ConfigService);
    isEnvTest(): boolean;
    stripEndSlashes(s: string): string;
}

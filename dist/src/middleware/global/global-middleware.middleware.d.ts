import { NestMiddleware } from '@nestjs/common';
export declare class GlobalMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void): void;
}

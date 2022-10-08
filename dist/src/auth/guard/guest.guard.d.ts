import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class AllowGuest implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}

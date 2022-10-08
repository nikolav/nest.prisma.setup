import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';
export declare class RolesGuard implements CanActivate {
    private readonly reflector;
    private readonly auth;
    constructor(reflector: Reflector, auth: AuthService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}

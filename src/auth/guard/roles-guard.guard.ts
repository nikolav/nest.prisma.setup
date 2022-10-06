import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly auth: AuthService,
  ) {}
  //
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // allow * if no role policy declared
    if (!roles || !roles.length) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    // check unauthenticated request
    if (!user) {
      return false;
    }
    // pg roles lookup/match
    return this.auth.matchesRoles(user, roles);
  }
}

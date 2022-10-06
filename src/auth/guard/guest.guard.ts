import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
//
@Injectable()
export class AllowGuest implements CanActivate {
  canActivate(context: ExecutionContext) {
    const { user } = context.switchToHttp().getRequest();
    return !user;
  }
}

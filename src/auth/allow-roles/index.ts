import { SetMetadata } from '@nestjs/common';
// declare access policies for routes
export const AllowRoles = (...roles: string[]) => SetMetadata('roles', roles);

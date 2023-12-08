import { CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES, RolesType } from './roles';

export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { roles: RolesRequired, isAll } = this.reflector.getAllAndOverride<RolesType>(ROLES, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (RolesRequired.length === 0) {
      return true;
    }

    const { roles } = context.switchToHttp().getRequest().user;

    let hasPermission = false;

    if (isAll) {
      hasPermission = RolesRequired.every((role) => roles.includes(role));
    } else {
      hasPermission = RolesRequired.some((role) => roles.includes(role));
    }

    if (!hasPermission) {
      throw new HttpException('Unauthorized Roles', 401, {
        cause: {
          name: 'Unauthorized',
          message: 'You must provide a valid authorization header',
        },
        description: 'You must provide a valid authorization header',
      });
    }

    return true;
  }
}

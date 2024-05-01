import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  ROLE_PERMISSIONS,
  messages,
  ExtendedRequestInterface,
} from './../index';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let allowedPermission = this.reflector.get<string>(
      'permission',
      context.getHandler(),
    );

    const request: ExtendedRequestInterface = context
      .switchToHttp()
      .getRequest();

    if (
      !request?.user?.role ||
      !allowedPermission ||
      allowedPermission.length == 0
    ) {
      throw new NotFoundException(messages.userRoleNotFound);
    }

    if (!ROLE_PERMISSIONS[request.user.role].includes(allowedPermission)) {
      throw new ForbiddenException(messages.userDoesNotHavePermission);
    }
    return true;
  }
}

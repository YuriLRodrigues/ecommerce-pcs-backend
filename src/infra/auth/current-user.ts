import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserPayload } from './auth-user';

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): UserPayload => {
  return context.switchToHttp().getRequest().user;
});

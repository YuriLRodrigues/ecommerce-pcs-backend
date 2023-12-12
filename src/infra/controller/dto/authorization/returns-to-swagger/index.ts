import { AuthorizationUser200DTO } from './authorization-user-200.dto';
import { AuthorizationUser400DTO } from './authorization-user-400.dto';
import { AuthorizationUser403DTO } from './authorization-user-403.dto';
import { AuthorizationUser404DTO } from './authorization-user-404.dto';

export const AuthorizationUserRS = {
  200: AuthorizationUser200DTO,
  400: AuthorizationUser400DTO,
  403: AuthorizationUser403DTO,
  404: AuthorizationUser404DTO,
};

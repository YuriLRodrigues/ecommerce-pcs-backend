import { AuthorizationUser200 } from './authorization-user-return-200.dto';
import { AuthorizationUser401Error } from './authorization-user-return-401.dto';
import { AuthorizationUser404Error } from './authorization-user-return-404.dto';

export const AuthorizationUserRS = {
  200: AuthorizationUser200,
  401: AuthorizationUser401Error,
  404: AuthorizationUser404Error,
};

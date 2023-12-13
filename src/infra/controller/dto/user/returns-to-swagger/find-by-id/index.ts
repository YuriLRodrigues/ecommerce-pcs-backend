import { FindUserById200DTO } from './find-user-by-id.200.dto';
import { FindUserById400DTO } from './find-user-by-id.400.dto';
import { FindUserById401DTO } from './find-user-by-id.401.dto';
import { FindUserById404DTO } from './find-user-by-id.404.dto';

export const FindByIdUserRS = {
  200: FindUserById200DTO,
  400: FindUserById400DTO,
  401: FindUserById401DTO,
  404: FindUserById404DTO,
};

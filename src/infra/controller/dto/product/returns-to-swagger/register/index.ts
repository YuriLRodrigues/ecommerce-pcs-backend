import { RegisterProduct200DTO } from './register-product-200.dto';
import { RegisterProduct400DTO } from './register-product-400.dto';
import { RegisterProduct401DTO } from './register-product-401.dto';
import { RegisterProduct409DTO } from './register-product-409.dto';

export const RegisterProductRS = {
  200: RegisterProduct200DTO,
  400: RegisterProduct400DTO,
  401: RegisterProduct401DTO,
  409: RegisterProduct409DTO,
};

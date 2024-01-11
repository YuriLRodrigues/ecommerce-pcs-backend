import { FindById200DTO } from './find-image-by-id-200-dto';
import { FindById400DTO } from './find-image-by-id-400.dto';
import { FindById401DTO } from './find-image-by-id-401.dto';
import { FindById404DTO } from './find-image-by-id-404.dto';

export const FindByIdRS = {
  200: FindById200DTO,
  400: FindById400DTO,
  401: FindById401DTO,
  404: FindById404DTO,
};

import { FindAllProducts200DTO } from './find-all-products-200.dto';
import { FindAllProducts400DTO } from './find-all-products-400.dto';
import { FindAllProducts401DTO } from './find-all-products-401.dto';
import { FindAllProducts404DTO } from './find-all-products-404.dto';

export const FindAllProductsRS = {
  200: FindAllProducts200DTO,
  400: FindAllProducts400DTO,
  401: FindAllProducts401DTO,
  404: FindAllProducts404DTO,
};

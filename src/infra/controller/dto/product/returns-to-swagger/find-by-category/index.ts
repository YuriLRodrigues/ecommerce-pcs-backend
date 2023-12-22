import { FindProductsByCategory200DTO } from './find-products-by-category-200.dto';
import { FindProductsByCategory400DTO } from './find-products-by-category-400.dto';
import { FindProductsByCategory404DTO } from './find-products-by-category-404.dto';

export const FindByCategoryRS = {
  200: FindProductsByCategory200DTO,
  400: FindProductsByCategory400DTO,
  404: FindProductsByCategory404DTO,
};

import { FindProductsByCategory200DTO } from './find-by-category-200.dto';
import { FindProductsByCategory400DTO } from './find-by-category-400.dto';
import { FindProductsByCategory401DTO } from './find-by-category-401.dto';
import { FindProductsByCategory404DTO } from './find-by-category-404.dto';

export const FindProductsByCategoryRS = {
  200: FindProductsByCategory200DTO,
  400: FindProductsByCategory400DTO,
  401: FindProductsByCategory401DTO,
  404: FindProductsByCategory404DTO,
};

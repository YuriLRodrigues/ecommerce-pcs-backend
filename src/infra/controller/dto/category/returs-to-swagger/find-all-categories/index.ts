import { FindAllCategories200DTO } from './find-all-categories-200-dto';
import { FindAllCategories400DTO } from './find-all-categories-400-dto';
import { FindAllCategories404DTO } from './find-all-categories-404-dto';

export const FindAllCategoriesRS = {
  200: FindAllCategories200DTO,
  400: FindAllCategories400DTO,
  404: FindAllCategories404DTO,
};

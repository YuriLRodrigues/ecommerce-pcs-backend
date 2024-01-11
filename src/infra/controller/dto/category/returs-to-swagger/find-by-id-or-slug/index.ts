import { FindCategoryByIdOrSlug200DTO } from './find-category-by-id-or-slug-200-dto';
import { FindCategoryByIdOrSlug400DTO } from './find-category-by-id-or-slug-400-dto';
import { FindCategoryByIdOrSlug404DTO } from './find-category-by-id-or-slug-404-dto';

export const FindCategoryRS = {
  200: FindCategoryByIdOrSlug200DTO,
  400: FindCategoryByIdOrSlug400DTO,
  404: FindCategoryByIdOrSlug404DTO,
};

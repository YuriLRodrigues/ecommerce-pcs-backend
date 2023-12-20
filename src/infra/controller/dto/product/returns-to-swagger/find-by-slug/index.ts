import { FindProductsBySlug200DTO } from './find-by-slug-200.dto';
import { FindProductsBySlug400DTO } from './find-by-slug-400.dto';
import { FindProductsBySlug401DTO } from './find-by-slug-401.dto';
import { FindProductsBySlug404DTO } from './find-by-slug-404.dto';

export const FindProductsBySlugRS = {
  200: FindProductsBySlug200DTO,
  400: FindProductsBySlug400DTO,
  401: FindProductsBySlug401DTO,
  404: FindProductsBySlug404DTO,
};

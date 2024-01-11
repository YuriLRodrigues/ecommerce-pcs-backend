import { FindManyByIds200DTO } from './find-many-images-by-ids-200-dto';
import { FindManyByIds400DTO } from './find-many-images-by-ids-400.dto';
import { FindManyByIds401DTO } from './find-many-images-by-ids-401.dto';
import { FindManyByIds404DTO } from './find-many-images-by-ids-404.dto';

export const FindManyByIdsRS = {
  200: FindManyByIds200DTO,
  400: FindManyByIds400DTO,
  401: FindManyByIds401DTO,
  404: FindManyByIds404DTO,
};

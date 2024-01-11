import { DeleteCategory200DTO } from './create-category-200.dto';
import { DeleteCategory400DTO } from './delete-category-400.dto';
import { DeleteCategory401DTO } from './delete-category-401.dto';
import { DeleteCategory404DTO } from './delete-category-404.dto';

export const DeleteCategoryRS = {
  200: DeleteCategory200DTO,
  400: DeleteCategory400DTO,
  401: DeleteCategory401DTO,
  404: DeleteCategory404DTO,
};

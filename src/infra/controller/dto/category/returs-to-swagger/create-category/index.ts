import { CreateCategory200DTO } from './create-category-200.dto';
import { CreateCategory400DTO } from './create-category-400.dto';
import { CreateCategory401DTO } from './create-category-401.dto';
import { CreateCategory409DTO } from './create-category-409.dto';

export const CreateCategoryRS = {
  200: CreateCategory200DTO,
  400: CreateCategory400DTO,
  401: CreateCategory401DTO,
  409: CreateCategory409DTO,
};

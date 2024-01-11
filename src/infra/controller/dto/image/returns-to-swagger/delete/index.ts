import { DeleteImage200DTO } from './delete-image-200-dto';
import { DeleteImage400DTO } from './delete-image-400.dto';
import { DeleteImage401DTO } from './delete-image-401.dto';
import { DeleteImage404DTO } from './delete-image-404.dto';

export const DeleteImageRS = {
  200: DeleteImage200DTO,
  400: DeleteImage400DTO,
  401: DeleteImage401DTO,
  404: DeleteImage404DTO,
};

import { UploadImage200DTO } from './upload-image-200-dto';
import { UploadImage400DTO } from './upload-image-400-dto';
import { UploadImage401DTO } from './upload-image-401.dto';
import { UploadImage409DTO } from './upload-image-409.dto';

export const ImageUploadRS = {
  200: UploadImage200DTO,
  400: UploadImage400DTO,
  401: UploadImage401DTO,
  409: UploadImage409DTO,
};

import { UploadImageParams, Uploader } from '@root/infra/database/upload/upload.repository';
import { randomUUID } from 'crypto';

export class InMemoryUploaderRepository implements Uploader {
  async uploadImage({ image }: UploadImageParams): Promise<{ url: string }> {
    const uploadId = randomUUID();

    const uniqueName = `${uploadId}-${image.fileName}`;

    return {
      url: uniqueName,
    };
  }
}

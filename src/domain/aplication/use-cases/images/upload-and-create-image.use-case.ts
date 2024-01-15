import { Injectable } from '@nestjs/common';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { Either, left, right } from '@root/core/logic/Either';
import { ImageEntity } from '@root/domain/enterprise/entities/image.entity';
import { Uploader } from '@root/infra/database/upload/upload.repository';

import { ImagesRepository } from '../../repositories/images.repository';

type Input = {
  productId?: UniqueEntityId;
  categoryId?: UniqueEntityId;
  image: {
    fileName: string;
    fileType: string;
    body: Buffer;
  };
};

type Output = Either<Error, ImageEntity>;

@Injectable()
export class UploadAndCreateImageUseCase {
  constructor(
    private readonly imagesRepository: ImagesRepository,
    private readonly uploader: Uploader,
  ) {}

  async execute({ image, productId, categoryId }: Input): Promise<Output> {
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(image.fileType)) {
      return left(new Error(`Invalid image type`));
    }

    const upload = await this.uploader.uploadImage({ image });

    const imageEntity = ImageEntity.create({
      url: upload.url,
      productId,
      categoryId,
    });

    await this.imagesRepository.create({ image: imageEntity });

    return right(imageEntity);
  }
}

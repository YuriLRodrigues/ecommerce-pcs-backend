import { Injectable } from '@nestjs/common';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { Either, left, right } from '@root/core/logic/Either';
import { ImageEntity } from '@root/domain/enterprise/entities/image.entity';

import { ImagesRepository } from '../../repositories/images.repository';

type Input = {
  imageId: UniqueEntityId;
};

type Output = Either<Error, ImageEntity>;

@Injectable()
export class FindImageByIdUseCase {
  constructor(private readonly imagesRepository: ImagesRepository) {}

  async execute({ imageId }: Input): Promise<Output> {
    const imageExists = await this.imagesRepository.findById({
      id: imageId,
    });

    if (!imageExists) {
      return left(new Error(`This image doesn't exist`));
    }

    return right(imageExists);
  }
}

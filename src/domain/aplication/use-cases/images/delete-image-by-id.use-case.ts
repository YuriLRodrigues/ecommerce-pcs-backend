import { Injectable } from '@nestjs/common';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { Either, left, right } from '@root/core/logic/Either';

import { ImagesRepository } from '../../repositories/images.repository';

type Input = {
  imageId: UniqueEntityId;
};

type Output = Either<Error, void>;

@Injectable()
export class DeleteImageByIdUseCase {
  constructor(private readonly imagesRepository: ImagesRepository) {}

  async execute({ imageId }: Input): Promise<Output> {
    const imageExists = await this.imagesRepository.findById({
      id: imageId,
    });

    if (!imageExists) {
      return left(new Error('Image not found'));
    }

    await this.imagesRepository.delete({
      imageId,
    });

    return right(null);
  }
}

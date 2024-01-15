import { Injectable } from '@nestjs/common';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { Either, left, right } from '@root/core/logic/Either';
import { ImageEntity } from '@root/domain/enterprise/entities/image.entity';

import { ImagesRepository } from '../../repositories/images.repository';

type Input = {
  ids: UniqueEntityId[];
};

type Output = Either<Error, ImageEntity[]>;

@Injectable()
export class FindManyImagesByIdsUseCase {
  constructor(private readonly imagesRepository: ImagesRepository) {}

  async execute({ ids }: Input): Promise<Output> {
    const images = await this.imagesRepository.findManyByIds({
      ids,
    });

    if (images.length === 0) {
      return left(new Error('No images found'));
    }

    return right(images);
  }
}

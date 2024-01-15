import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@root/core/logic/Either';
import { ImageEntity } from '@root/domain/enterprise/entities/image.entity';

import { ImagesRepository } from '../../repositories/images.repository';
import { ProductRepository } from '../../repositories/product.repository';

type Input = {
  productSlug: string;
};

type Output = Either<Error, ImageEntity[]>;

@Injectable()
export class FindImagesByProductSlugUseCase {
  constructor(
    private readonly imagesRepository: ImagesRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute({ productSlug }: Input): Promise<Output> {
    const productExists = await this.productRepository.findProductBySlug({
      slug: productSlug,
    });

    if (!productExists) {
      return left(new Error('Product not found'));
    }

    const imagesByProductId = await this.imagesRepository.findByProductId({
      productId: productExists.id,
    });

    if (imagesByProductId.length === 0) {
      return left(new Error('No images found for this product'));
    }

    return right(imagesByProductId);
  }
}

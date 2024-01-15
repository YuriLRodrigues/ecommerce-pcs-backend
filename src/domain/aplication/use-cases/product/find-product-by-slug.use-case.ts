import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@root/core/logic/Either';
import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';

import { ProductRepository } from '../../repositories/product.repository';

type Output = Either<Error, ProductEntity>;

type Input = {
  slug: string;
};

@Injectable()
export class FindProductBySlugUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({ slug }: Input): Promise<Output> {
    const product = await this.productRepository.findProductBySlug({
      slug,
    });

    if (!product) {
      return left(new Error('Product not found'));
    }

    return right(product);
  }
}

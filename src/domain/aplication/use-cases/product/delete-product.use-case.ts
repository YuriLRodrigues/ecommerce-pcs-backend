import { Either, left, right } from '@root/core/logic/Either';
import { ProductRepository } from '../../repositories/product.repository';
import { Injectable } from '@nestjs/common';

type Output = Either<Error, void>;

type Input = {
  productSlug: string;
};

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({ productSlug }: Input): Promise<Output> {
    const product = await this.productRepository.findProductBySlug({
      slug: productSlug,
    });

    if (!product) {
      return left(new Error(`Product ${productSlug} not found`));
    }

    await this.productRepository.delete({ productSlug });
    return right(null);
  }
}

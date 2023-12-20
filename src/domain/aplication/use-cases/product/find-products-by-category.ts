import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';
import { ProductRepository } from '../../repositories/product.repository';
import { Either, left, right } from '@root/core/logic/Either';

type Input = {
  slug: string;
};

type Output = Either<Error, ProductEntity[]>;

export class FindProductsByCategory {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({ slug }: Input): Promise<Output> {
    const productsByCategory = await this.productRepository.findProductByCategory({
      slug,
    });

    if (!productsByCategory) {
      return left(new Error('Products not found in this category'));
    }

    return right(productsByCategory);
  }
}

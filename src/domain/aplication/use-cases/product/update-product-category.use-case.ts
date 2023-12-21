import { Either, left, right } from '@root/core/logic/Either';
import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';
import { ProductRepository } from '../../repositories/product.repository';
import { CategoryRepository } from '../../repositories/category.repository';
import { Injectable } from '@nestjs/common';

type Output = Either<Error, ProductEntity>;

type Input = {
  productSlug: string;
  categoryId: string;
};

@Injectable()
export class UpdateProductCategoryUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute({ productSlug, categoryId }: Input): Promise<Output> {
    const product = await this.productRepository.findProductBySlug({
      slug: productSlug,
    });

    if (!product) {
      return left(new Error('This product does not exist'));
    }

    const categoryExists = await this.categoryRepository.findCategoryById({
      categoryId,
    });

    if (!categoryExists) {
      return left(new Error('This category does not exist'));
    }

    product.categoryId = categoryId;

    await this.productRepository.save({ product });

    return right(product);
  }
}

import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';
import { CategoryRepository } from '../../repositories/category.repository';
import { ProductRepository } from '../../repositories/product.repository';
import { Either, left, right } from '@root/core/logic/Either';
import { Injectable } from '@nestjs/common';

type Input = {
  categorySlug: string;
};

type Output = Either<Error, ProductEntity[]>;

@Injectable()
export class FindProductsByCategoryUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute({ categorySlug }: Input): Promise<Output> {
    const categoryExists = await this.categoryRepository.findCategoryBySlug({
      categorySlug,
    });

    if (!categoryExists) {
      return left(new Error('Category not found'));
    }

    const productsWithCategory = await this.productRepository.findProductsByCategory({
      categorySlug,
    });

    if (!productsWithCategory) {
      return left(new Error('Product not found'));
    }

    return right(productsWithCategory);
  }
}

import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';
import { CategoryRepository } from '../../repositories/category.repository';
import { ProductRepository } from '../../repositories/product.repository';
import { Either, left, right } from '@root/core/logic/Either';
import { Injectable } from '@nestjs/common';

type Input = {
  categorySlug: string;
  page: number;
  limit: number;
  inStock?: boolean | undefined;
};

type Output = Either<Error, ProductEntity[]>;

@Injectable()
export class FindProductsByCategoryUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute({ categorySlug, limit, page, inStock }: Input): Promise<Output> {
    const categoryExists = await this.categoryRepository.findBySlug({
      categorySlug,
    });

    if (!categoryExists) {
      return left(new Error('Category not found'));
    }

    const productsWithCategory = await this.productRepository.findProductsByCategory({
      categoryId: categoryExists.id.toValue(),
      limit,
      page,
      inStock,
    });

    if (productsWithCategory.length === 0) {
      return left(new Error('No products found in this category'));
    }

    return right(productsWithCategory);
  }
}

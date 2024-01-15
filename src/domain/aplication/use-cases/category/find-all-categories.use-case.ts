import { Either, left, right } from '@root/core/logic/Either';
import { CategoryDetailsEntity } from '@root/domain/enterprise/entities/category-details.entity';

import { CategoryRepository } from '../../repositories/category.repository';

type Output = Either<Error, CategoryDetailsEntity[]>;

export class FindAllCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(): Promise<Output> {
    const categories = await this.categoryRepository.findAll();

    if (categories.length === 0) {
      return left(new Error(`Cannot find all categories`));
    }

    return right(categories);
  }
}

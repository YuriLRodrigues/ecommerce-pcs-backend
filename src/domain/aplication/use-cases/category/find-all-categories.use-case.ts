import { Either, left, right } from '@root/core/logic/Either';
import { CategoryRepository } from '../../repositories/category.repository';
import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';

type Input = {
  limit?: number;
  page?: number;
};

type Output = Either<Error, CategoryEntity[]>;

export class FindAllCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute({ limit, page }: Input): Promise<Output> {
    const categories = await this.categoryRepository.findAll({
      limit,
      page,
    });

    if (!categories) {
      return left(new Error(`Cannot find all categories`));
    }

    return right(categories);
  }
}

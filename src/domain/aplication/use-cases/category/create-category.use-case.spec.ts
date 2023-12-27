import { Either, left, right } from '@root/core/logic/Either';
import { CategoryRepository } from '../../repositories/category.repository';
import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';

type Input = {
  name: string;
};

type Output = Either<Error, CategoryEntity>;

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute({ name }: Input): Promise<Output> {
    const category = CategoryEntity.create({
      name,
    });

    const categoryExists = await this.categoryRepository.findBySlug({
      categorySlug: category.slug,
    });

    if (categoryExists) {
      return left(new Error(`This category already exists`));
    }

    const newCategory = await this.categoryRepository.create({
      category,
    });

    return right(newCategory);
  }
}

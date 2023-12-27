import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';
import { CategoryRepository } from '../../repositories/category.repository';
import { Either, left, right } from '@root/core/logic/Either';

type Input = {
  name: string;
  slug?: string;
  createdAt?: Date;
};

type Output = Either<Error, CategoryEntity>;

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute({ name, createdAt, slug }: Input): Promise<Output> {
    const category = CategoryEntity.create({
      name,
      createdAt,
      slug,
    });

    const categoryExists = await this.categoryRepository.findBySlug({
      categorySlug: category.slug,
    });

    if (categoryExists) {
      return left(new Error(`Category already exists`));
    }

    const newCategory = await this.categoryRepository.create({
      category,
    });

    if (!newCategory) {
      return left(new Error(`Cannot create category`));
    }

    return right(newCategory);
  }
}

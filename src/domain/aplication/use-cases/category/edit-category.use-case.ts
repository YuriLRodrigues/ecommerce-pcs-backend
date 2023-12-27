import { Either, left, right } from '@root/core/logic/Either';
import { CategoryRepository } from '../../repositories/category.repository';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';
import { createSlug } from '@root/utils/create-slug';

type Input = {
  categoryId: UniqueEntityId;
  name?: string;
  slug?: string;
  updatedAt?: Date;
};

type Output = Either<Error, CategoryEntity>;

export class EditCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute({ categoryId, name, slug, updatedAt }: Input): Promise<Output> {
    const categoryExists = await this.categoryRepository.findById({
      categoryId: categoryId.toValue(),
    });

    if (!categoryExists) {
      return left(new Error(`This category does not exist`));
    }

    categoryExists.editInfo({
      name,
      slug: slug ?? createSlug(name),
      updatedAt,
    });

    await this.categoryRepository.save({
      category: categoryExists,
    });

    return right(categoryExists);
  }
}

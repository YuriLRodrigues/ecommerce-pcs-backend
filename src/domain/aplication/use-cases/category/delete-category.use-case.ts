import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { CategoryRepository } from '../../repositories/category.repository';
import { Either, left, right } from '@root/core/logic/Either';

type Input = {
  categoryId: UniqueEntityId;
};

type Output = Either<Error, void>;

export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute({ categoryId }: Input): Promise<Output> {
    const categoryExists = await this.categoryRepository.findById({
      categoryId: categoryId.toValue(),
    });

    if (!categoryExists) {
      return left(new Error(`This category does not exist`));
    }

    await this.categoryRepository.delete({
      categoryId: categoryId.toValue(),
    });

    return right(null);
  }
}

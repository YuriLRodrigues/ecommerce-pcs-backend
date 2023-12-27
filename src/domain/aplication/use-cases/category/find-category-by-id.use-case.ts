import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../repositories/category.repository';
import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';
import { Either, left, right } from '@root/core/logic/Either';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';

type Output = Either<Error, CategoryEntity>;

type Input = {
  categoryId: UniqueEntityId;
};

@Injectable()
export class FindCategoryByIdUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute({ categoryId }: Input): Promise<Output> {
    const categoryExists = await this.categoryRepository.findById({
      categoryId: categoryId.toValue(),
    });

    if (!categoryExists) {
      return left(new Error(`This category doesn't exists`));
    }

    return right(categoryExists);
  }
}

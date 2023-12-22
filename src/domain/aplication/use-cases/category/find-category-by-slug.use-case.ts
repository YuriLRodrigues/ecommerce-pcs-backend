import { Either, left, right } from '@root/core/logic/Either';
import { CategoryRepository } from '../../repositories/category.repository';
import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';
import { Injectable } from '@nestjs/common';

type Output = Either<Error, CategoryEntity>;

type Input = {
  categorySlug: string;
};

@Injectable()
export class FindCategoryBySlugUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute({ categorySlug }: Input): Promise<Output> {
    const category = await this.categoryRepository.findCategoryBySlug({
      categorySlug,
    });

    if (!category) {
      return left(new Error(`This category doesn't exists`));
    }

    return right(category);
  }
}

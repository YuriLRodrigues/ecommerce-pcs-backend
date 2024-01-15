import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { Either, left, right } from '@root/core/logic/Either';
import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';
import { createSlug } from '@root/utils/create-slug';

import { CategoryRepository } from '../../repositories/category.repository';
import { ImagesRepository } from '../../repositories/images.repository';

type Input = {
  name: string;
  slug?: string;
  createdAt?: Date;
  imageId: UniqueEntityId;
};

type Output = Either<Error, CategoryEntity>;

export class CreateCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly imagesRepository: ImagesRepository,
  ) {}

  async execute({ name, createdAt, slug, imageId }: Input): Promise<Output> {
    const categoryExists = await this.categoryRepository.findBySlug({
      categorySlug: slug ?? createSlug(name),
    });

    if (categoryExists) {
      return left(new Error(`Category already exists`));
    }

    const category = CategoryEntity.create({
      name,
      createdAt,
      slug,
    });

    const image = await this.imagesRepository.findById({
      id: imageId,
    });

    const newCategory = await this.categoryRepository.create({
      category,
    });

    image.categoryId = category.id;

    await this.imagesRepository.save({
      image,
    });

    return right(newCategory);
  }
}

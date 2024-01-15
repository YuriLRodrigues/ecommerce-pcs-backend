import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { Either, left, right } from '@root/core/logic/Either';
import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';
import { createSlug } from '@root/utils/create-slug';

import { CategoryRepository } from '../../repositories/category.repository';
import { ImagesRepository } from '../../repositories/images.repository';

type Input = {
  categoryId: UniqueEntityId;
  name?: string;
  slug?: string;
  updatedAt?: Date;
  imagesIds?: Array<UniqueEntityId>;
};

type Output = Either<Error, CategoryEntity>;

export class EditCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly imagesRepository: ImagesRepository,
  ) {}

  async execute({ categoryId, name, slug, updatedAt, imagesIds }: Input): Promise<Output> {
    const categoryExists = await this.categoryRepository.findById({
      categoryId: categoryId.toValue(),
    });

    if (!categoryExists) {
      return left(new Error(`This category doesn't exist`));
    }

    const imagesByCategoryId = await this.imagesRepository.findByCategoryId({
      categoryId,
    });

    const imagesIdsByCategory = imagesByCategoryId.map((img) => img.id);

    const imagesOnDeleteId = imagesIdsByCategory.filter(
      (originalId) => !imagesIds.find((id) => originalId.toValue() === id.toValue()),
    );

    const imagesOnSaveId = imagesIds.filter(
      (originalId) => !imagesIdsByCategory.find((id) => originalId.toValue() === id.toValue()),
    );

    const findImagesOnSave = await this.imagesRepository.findManyByIds({
      ids: imagesOnSaveId,
    });

    const imagesOnSave = findImagesOnSave.map((img) => {
      img.categoryId = categoryId;

      return img;
    });

    categoryExists.editInfo({
      name,
      slug: slug ?? createSlug(name),
      updatedAt,
    });

    const callDelete = this.imagesRepository.deleteMany({
      imagesIds: imagesOnDeleteId,
    });

    const callSaveImg = this.imagesRepository.saveMany({
      images: imagesOnSave,
    });

    const callSaveCat = this.categoryRepository.save({
      category: categoryExists,
    });

    await Promise.all([callDelete, callSaveImg, callSaveCat]);

    return right(categoryExists);
  }
}

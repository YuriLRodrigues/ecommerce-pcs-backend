import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';
import { InMemoryCategoryRepository } from 'test/repositories/in-memory-category.repository';
import { InMemoryImagesRepository } from 'test/repositories/in-memory-images-repository';

import { FindCategoryByIdUseCase } from './find-category-by-id.use-case';

describe('Find Category By Id - Use Case', () => {
  let sut: FindCategoryByIdUseCase;
  let inMemoryCategoryRepository: InMemoryCategoryRepository;
  let inMemoryImagesRepository: InMemoryImagesRepository;

  const category = CategoryEntity.create({
    name: 'Pcs',
  });

  beforeEach(() => {
    inMemoryImagesRepository = new InMemoryImagesRepository();
    inMemoryCategoryRepository = new InMemoryCategoryRepository(inMemoryImagesRepository);
    sut = new FindCategoryByIdUseCase(inMemoryCategoryRepository);
    inMemoryCategoryRepository.create({
      category,
    });
  });

  it('should be able to find a category with your correctly id', async () => {
    const output = await sut.execute({
      categoryId: category.id,
    });

    expect(output.isRight()).toBe(true);
    expect(output.value).toEqual(
      expect.objectContaining({
        id: category.id,
        name: 'Pcs',
        slug: 'pcs',
      }),
    );
    expect(inMemoryCategoryRepository.categories).toHaveLength(1);
  });

  it('should not be able to find a category with an incorrect/invalid id', async () => {
    const randomId = new UniqueEntityId();

    const output = await sut.execute({
      categoryId: randomId,
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error(`This category doesn't exists`));
    expect(inMemoryCategoryRepository.categories).toHaveLength(1);
  });
});

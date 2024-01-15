import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';
import { InMemoryCategoryRepository } from 'test/repositories/in-memory-category.repository';
import { InMemoryImagesRepository } from 'test/repositories/in-memory-images-repository';

import { DeleteCategoryUseCase } from './delete-category.use-case';

describe('Delete Category - Use Case', () => {
  let inMemoryCategoryRepository: InMemoryCategoryRepository;
  let inMemoryImagesRepository: InMemoryImagesRepository;
  let sut: DeleteCategoryUseCase;

  const category = CategoryEntity.create({
    name: 'PCS',
  });

  beforeEach(() => {
    inMemoryImagesRepository = new InMemoryImagesRepository();
    inMemoryCategoryRepository = new InMemoryCategoryRepository(inMemoryImagesRepository);
    sut = new DeleteCategoryUseCase(inMemoryCategoryRepository);
    inMemoryCategoryRepository.create({
      category,
    });
  });

  it('should be able to delete a category by your id', async () => {
    const output = await sut.execute({
      categoryId: category.id,
    });

    expect(output.isRight()).toBe(true);
    expect(inMemoryCategoryRepository.categories).toHaveLength(0);
  });

  it('should not be able to delete a category with invalid id', async () => {
    const randomId = new UniqueEntityId();

    const output = await sut.execute({
      categoryId: randomId,
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error(`This category doesn't exist`));
    expect(inMemoryCategoryRepository.categories).toHaveLength(1);
  });
});

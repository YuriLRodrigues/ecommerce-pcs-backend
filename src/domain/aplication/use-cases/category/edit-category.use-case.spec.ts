import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';
import { InMemoryCategoryRepository } from 'test/repositories/in-memory-category.repository';
import { InMemoryImagesRepository } from 'test/repositories/in-memory-images-repository';

import { EditCategoryUseCase } from './edit-category.use-case';

describe('Edit Category Info - Use Case', () => {
  let inMemoryCategoryRepository: InMemoryCategoryRepository;
  let inMemoryImagesRepository: InMemoryImagesRepository;
  let sut: EditCategoryUseCase;

  const category = CategoryEntity.create({
    name: 'PCS',
  });

  beforeEach(() => {
    inMemoryImagesRepository = new InMemoryImagesRepository();
    inMemoryCategoryRepository = new InMemoryCategoryRepository(inMemoryImagesRepository);
    sut = new EditCategoryUseCase(inMemoryCategoryRepository, inMemoryImagesRepository);
    inMemoryCategoryRepository.create({
      category,
    });
  });

  it('should be able to edit an existing category by your id', async () => {
    const output = await sut.execute({
      categoryId: category.id,
      imagesIds: [],
      name: 'Consoles',
    });

    expect(output.isRight()).toBe(true);
    expect(inMemoryCategoryRepository.categories).toHaveLength(1);
    expect(output.value).toEqual(
      expect.objectContaining({
        name: 'Consoles',
        slug: 'consoles',
      }),
    );
  });

  it('should not be able to edit an existing category with invalid id', async () => {
    const randomId = new UniqueEntityId();

    const output = await sut.execute({
      categoryId: randomId,
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error(`This category doesn't exist`));
    expect(inMemoryCategoryRepository.categories).toHaveLength(1);
  });
});

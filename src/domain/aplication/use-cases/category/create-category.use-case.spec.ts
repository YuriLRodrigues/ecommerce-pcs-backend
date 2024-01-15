import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';
import { ImageEntity } from '@root/domain/enterprise/entities/image.entity';
import { InMemoryCategoryRepository } from 'test/repositories/in-memory-category.repository';
import { InMemoryImagesRepository } from 'test/repositories/in-memory-images-repository';

import { CreateCategoryUseCase } from './create-category.use-case';

describe('Create Category - Use Case', () => {
  let inMemoryCategoryRepository: InMemoryCategoryRepository;
  let inMemoryImagesRepository: InMemoryImagesRepository;
  let sut: CreateCategoryUseCase;

  const categoryExists = CategoryEntity.create({
    name: 'Consoles',
  });

  const image = ImageEntity.create({
    url: 'test',
    categoryId: categoryExists.id,
  });

  beforeEach(() => {
    inMemoryImagesRepository = new InMemoryImagesRepository();
    inMemoryCategoryRepository = new InMemoryCategoryRepository(inMemoryImagesRepository);
    sut = new CreateCategoryUseCase(inMemoryCategoryRepository, inMemoryImagesRepository);
    inMemoryImagesRepository.create({
      image,
    });
  });

  it('should be able to create an new category', async () => {
    const output = await sut.execute({
      name: 'PCS',
      imageId: image.id,
    });

    expect(output.isRight()).toBe(true);
    expect(inMemoryCategoryRepository.categories).toHaveLength(1);
  });

  it('should not be able to create a category with existing id or slug', async () => {
    inMemoryCategoryRepository.create({
      category: categoryExists,
    });

    const output = await sut.execute({
      name: categoryExists.name,
      imageId: image.id,
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error(`Category already exists`));
    expect(inMemoryCategoryRepository.categories).toHaveLength(1);
  });
});

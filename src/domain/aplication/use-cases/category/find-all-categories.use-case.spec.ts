import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';
import { ImageEntity } from '@root/domain/enterprise/entities/image.entity';
import { InMemoryCategoryRepository } from 'test/repositories/in-memory-category.repository';
import { InMemoryImagesRepository } from 'test/repositories/in-memory-images-repository';

import { FindAllCategoriesUseCase } from './find-all-categories.use-case';

describe('Find All Categories - Use Case', () => {
  let inMemoryCategoryRepository: InMemoryCategoryRepository;
  let inMemoryImagesRepository: InMemoryImagesRepository;
  let sut: FindAllCategoriesUseCase;

  const category = CategoryEntity.create({
    name: 'PCS',
  });

  const category2 = CategoryEntity.create({
    name: 'Consoles',
  });

  const image = ImageEntity.create(
    {
      url: 'test',
      categoryId: category.id,
    },
    new UniqueEntityId('image-1'),
  );

  beforeEach(() => {
    inMemoryImagesRepository = new InMemoryImagesRepository();
    inMemoryCategoryRepository = new InMemoryCategoryRepository(inMemoryImagesRepository);
    sut = new FindAllCategoriesUseCase(inMemoryCategoryRepository);
  });

  it('should not be able to find all categories', async () => {
    const output = await sut.execute();

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error(`Cannot find all categories`));
    expect(inMemoryCategoryRepository.categories).toHaveLength(0);
  });

  it('should be able to find all categories', async () => {
    inMemoryCategoryRepository.create({
      category,
    });
    inMemoryCategoryRepository.create({
      category: category2,
    });
    inMemoryImagesRepository.create({
      image,
    });

    const output = await sut.execute();

    expect(output.isRight()).toBe(true);
    expect(inMemoryCategoryRepository.categories).toHaveLength(2);
    expect(output.value).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          image: {
            url: image.url,
            id: image.id,
          },
          name: category.name,
          slug: category.slug,
        }),
      ]),
    );
  });
});

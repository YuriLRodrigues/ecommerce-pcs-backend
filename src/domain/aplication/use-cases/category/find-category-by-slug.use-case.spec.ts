import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';
import { InMemoryCategoryRepository } from 'test/repositories/in-memory-category.repository';
import { InMemoryImagesRepository } from 'test/repositories/in-memory-images-repository';

import { FindCategoryBySlugUseCase } from './find-category-by-slug.use-case';

describe('Find Category By Slug - Use Case', () => {
  let sut: FindCategoryBySlugUseCase;
  let inMemoryCategoryRepository: InMemoryCategoryRepository;
  let inMemoryImagesRepository: InMemoryImagesRepository;

  const category = CategoryEntity.create({
    name: 'Pcs',
  });

  beforeEach(() => {
    inMemoryImagesRepository = new InMemoryImagesRepository();
    inMemoryCategoryRepository = new InMemoryCategoryRepository(inMemoryImagesRepository);
    sut = new FindCategoryBySlugUseCase(inMemoryCategoryRepository);
    inMemoryCategoryRepository.create({
      category,
    });
  });

  it('should be able to find a category with your correctly slug', async () => {
    const output = await sut.execute({
      categorySlug: category.slug,
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

  it('should not be able to find a category with an incorrect/invalid slug', async () => {
    const output = await sut.execute({
      categorySlug: 'invalid-category-slug',
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error(`This category doesn't exists`));
    expect(inMemoryCategoryRepository.categories).toHaveLength(1);
  });
});

import { InMemoryCategoryRepository } from 'test/repositories/in-memory-category.repository';
import { FindCategoryByIdUseCase } from './find-category-by-id.use-case';
import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';

describe('Find Category By Id - Use Case', () => {
  let sut: FindCategoryByIdUseCase;
  let inMemoryCategoryRepository: InMemoryCategoryRepository;
  const category = CategoryEntity.create({
    name: 'Pcs',
  });

  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    sut = new FindCategoryByIdUseCase(inMemoryCategoryRepository);
    inMemoryCategoryRepository.createCategory({
      category,
    });
  });

  it('should be able to find a category with your correctly id', async () => {
    const output = await sut.execute({
      categoryId: category.id.toValue(),
    });

    expect(output.isRight()).toBe(true);
    expect(output.value).toEqual(
      expect.objectContaining({
        id: category.id,
        name: 'Pcs',
        slug: 'pcs',
      }),
    );
    expect(inMemoryCategoryRepository.category).toHaveLength(1);
  });

  it('not should be able to find a category with an incorrect/invalid id', async () => {
    const output = await sut.execute({
      categoryId: 'invalid-category-id',
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error(`This category doesn't exists`));
    expect(inMemoryCategoryRepository.category).toHaveLength(1);
  });
});

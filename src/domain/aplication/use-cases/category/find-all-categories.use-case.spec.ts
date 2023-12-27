import { InMemoryCategoryRepository } from 'test/repositories/in-memory-category.repository';
import { FindAllCategoriesUseCase } from './find-all-categories.use-case';
import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';

describe('Edit Category Info - Use Case', () => {
  let inMemoryCategoryRepository: InMemoryCategoryRepository;
  let sut: FindAllCategoriesUseCase;
  const category = CategoryEntity.create({
    name: 'PCS',
  });
  const category2 = CategoryEntity.create({
    name: 'Consoles',
  });

  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    sut = new FindAllCategoriesUseCase(inMemoryCategoryRepository);
    inMemoryCategoryRepository.create({
      category,
    });
    inMemoryCategoryRepository.create({
      category: category2,
    });
  });

  it('should be able to edit an existing category by your id', async () => {
    const output = await sut.execute({});

    expect(output.isRight()).toBe(true);
    expect(inMemoryCategoryRepository.category).toHaveLength(2);
    expect(inMemoryCategoryRepository.category).toEqual(output.value);
    expect(output.value).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'PCS',
          slug: 'pcs',
        }),
        expect.objectContaining({
          name: 'Consoles',
          slug: 'consoles',
        }),
      ]),
    );
  });
});

import { InMemoryCategoryRepository } from 'test/repositories/in-memory-category.repository';
import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { EditCategoryUseCase } from './edit-category.use-case';

describe('Edit Category Info - Use Case', () => {
  let inMemoryCategoryRepository: InMemoryCategoryRepository;
  let sut: EditCategoryUseCase;
  const category = CategoryEntity.create({
    name: 'PCS',
  });

  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    sut = new EditCategoryUseCase(inMemoryCategoryRepository);
    inMemoryCategoryRepository.create({
      category,
    });
  });

  it('should be able to edit an existing category by your id', async () => {
    const output = await sut.execute({
      categoryId: category.id,
      name: 'Consoles',
    });

    expect(output.isRight()).toBe(true);
    expect(inMemoryCategoryRepository.category).toHaveLength(1);
    expect(output.value).toEqual(
      expect.objectContaining({
        name: 'Consoles',
        slug: 'consoles',
      }),
    );
  });

  it('should be able to edit an existing category with invalid id', async () => {
    const randomId = new UniqueEntityId();
    const output = await sut.execute({
      categoryId: randomId,
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error(`This category does not exist`));
    expect(inMemoryCategoryRepository.category).toHaveLength(1);
  });
});

import { InMemoryCategoryRepository } from 'test/repositories/in-memory-category.repository';
import { DeleteCategoryUseCase } from './delete-category.use-case';
import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';

describe('Delete Category - Use Case', () => {
  let inMemoryCategoryRepository: InMemoryCategoryRepository;
  let sut: DeleteCategoryUseCase;
  const category = CategoryEntity.create({
    name: 'PCS',
  });

  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
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
    expect(inMemoryCategoryRepository.category).toHaveLength(0);
  });

  it('not should be able to delete a category with invalid id', async () => {
    const randomId = new UniqueEntityId();
    const output = await sut.execute({
      categoryId: randomId,
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error(`This category does not exist`));
    expect(inMemoryCategoryRepository.category).toHaveLength(1);
  });
});

import { InMemoryCategoryRepository } from 'test/repositories/in-memory-category.repository';
import { FindProductsByCategoryUseCase } from './find-products-by-category.use-case';
import { InMemoryProductRepository } from 'test/repositories/in-memory-product.repository';
import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';
import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';

describe('Find Products By Category - Use Case', () => {
  let sut: FindProductsByCategoryUseCase;
  let inMemoryCategoryRepository: InMemoryCategoryRepository;
  let inMemoryProductRepository: InMemoryProductRepository;

  const categoryPhones = CategoryEntity.create({
    name: 'Celulares',
  });

  const categoryPC = CategoryEntity.create({
    name: 'Computers',
  });

  const product = ProductEntity.create({
    name: 'Product 1',
    description: 'product-1',
    price: 100,
    categoryId: categoryPhones.id.toValue(),
  });
  const product2 = ProductEntity.create({
    name: 'Product 2',
    description: 'product-2',
    price: 100,
    categoryId: categoryPhones.id.toValue(),
  });
  const product3 = ProductEntity.create({
    name: 'Product 3',
    description: 'product-3',
    price: 100,
    categoryId: categoryPC.id.toValue(),
  });

  beforeAll(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new FindProductsByCategoryUseCase(inMemoryProductRepository, inMemoryCategoryRepository);

    inMemoryProductRepository.register({
      product,
    });
    inMemoryProductRepository.register({
      product: product2,
    });
    inMemoryProductRepository.register({
      product: product3,
    });

    inMemoryCategoryRepository.createCategory({
      category: categoryPC,
    });
    inMemoryCategoryRepository.createCategory({
      category: categoryPhones,
    });
  });

  it('should be able to find all products in a category', async () => {
    const output = await sut.execute({
      categorySlug: categoryPC.slug,
    });

    expect(output.isRight()).toBe(true);
    expect(
      inMemoryProductRepository.products.filter((prod) => prod.categoryId === categoryPC.id.toValue()),
    ).toHaveLength(1);
  });

  it('not should be able to find all products in a category non-existent', async () => {
    const output = await sut.execute({
      categorySlug: 'invalid category slug',
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error(`Category not found`));
  });
});

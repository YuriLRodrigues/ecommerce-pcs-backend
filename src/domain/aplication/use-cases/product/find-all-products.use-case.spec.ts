import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';
import { InMemoryProductRepository } from 'test/repositories/in-memory-product.repository';

import { FindAllProductsUseCase } from './find-all-products.use-case';

describe('Find All Products - Use Case', () => {
  let sut: FindAllProductsUseCase;
  let inMemoryProductRepository: InMemoryProductRepository;

  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new FindAllProductsUseCase(inMemoryProductRepository);
  });

  it('should not be able to find all the products in the bank (length 0)', async () => {
    const output = await sut.execute({
      limit: 2,
      page: 2,
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error(`No product was found`));
  });

  it('should be able to find all products in database with search', async () => {
    for (let i = 0; i < 25; i++) {
      const product = ProductEntity.create({
        description: 'description of product',
        name: `Product ${i + 1}`,
        price: 1000,
      });
      inMemoryProductRepository.register({ product });
    }

    const output = await sut.execute({ limit: 10, page: 1, search: 'Product 1' });
    expect(output.isRight()).toBe(true);
    expect(output.value).toHaveLength(1);
    expect(output.value).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: 'description of product',
          name: 'Product 1',
          price: 1000,
          slug: 'product-1',
        }),
      ]),
    );
  });

  it('should be able to find all products in database', async () => {
    for (let i = 0; i < 25; i++) {
      const product = ProductEntity.create({
        description: 'description of product',
        name: `Product ${i + 1}`,
        price: 1000,
      });
      inMemoryProductRepository.register({ product });
    }

    const output = await sut.execute({ limit: 2, page: 2 });

    expect(output.isRight()).toBe(true);
    expect(output.value).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: 'description of product',
          name: 'Product 3',
          price: 1000,
          slug: 'product-3',
        }),
        expect.objectContaining({
          description: 'description of product',
          name: 'Product 4',
          price: 1000,
          slug: 'product-4',
        }),
      ]),
    );
  });
});

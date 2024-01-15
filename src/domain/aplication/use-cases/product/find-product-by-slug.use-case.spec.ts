import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';
import { InMemoryProductRepository } from 'test/repositories/in-memory-product.repository';

import { FindProductBySlugUseCase } from './find-product-by-slug.use-case';

describe('Find Product By Slug - Use Case', () => {
  let sut: FindProductBySlugUseCase;
  let inMemoryProductRepository: InMemoryProductRepository;

  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new FindProductBySlugUseCase(inMemoryProductRepository);
    const repeat = 25;

    for (let i = 0; i < repeat; i++) {
      const product = ProductEntity.create({
        description: 'description of product',
        name: `Product ${i + 1}`,
        price: 1000,
      });
      inMemoryProductRepository.register({ product });
    }
  });

  it('should be able to find one product by your slug', async () => {
    const output = await sut.execute({ slug: 'product-1' });

    expect(output.isRight()).toBe(true);
    expect(output.value).toEqual(
      expect.objectContaining({
        description: 'description of product',
        name: `Product 1`,
        slug: `product-1`,
        price: 1000,
      }),
    );
  });

  it('should not be able to find one product by random slug', async () => {
    const output = await sut.execute({ slug: 'productsaas-1212' });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error('Product not found'));
  });
});

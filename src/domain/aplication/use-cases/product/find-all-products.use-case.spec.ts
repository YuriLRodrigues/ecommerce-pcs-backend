import { InMemoryProductRepository } from 'test/repositories/in-memory-product.repository';
import { FindAllProductsUseCase } from './find-all-products.use-case';
import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';

describe('Find All Products - Use Case', () => {
  let sut: FindAllProductsUseCase;
  let inMemoryProductRepository: InMemoryProductRepository;

  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new FindAllProductsUseCase(inMemoryProductRepository);
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

  it('should be able to find all products in database', async () => {
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

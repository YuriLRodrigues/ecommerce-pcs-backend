import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';
import { InMemoryProductRepository } from 'test/repositories/in-memory-product.repository';

import { DeleteProductUseCase } from './delete-product.use-case';

describe('Delete Product - Use Case', () => {
  let sut: DeleteProductUseCase;
  let inMemoryProductRepository: InMemoryProductRepository;

  const product = ProductEntity.create({
    name: 'product 1',
    description: 'description product',
    price: 100,
  });

  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new DeleteProductUseCase(inMemoryProductRepository);
    inMemoryProductRepository.register({
      product,
    });
  });

  it('should be able to delete a product with your correct slug', async () => {
    const output = await sut.execute({
      productSlug: product.slug,
    });

    expect(output.isRight()).toBe(true);
    expect(inMemoryProductRepository.products).toHaveLength(0);
  });

  it('should be able to delete a product with invalid slug', async () => {
    const productSlug = 'slug-inavlid';

    const output = await sut.execute({
      productSlug,
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error(`Product ${productSlug} not found`));
    expect(inMemoryProductRepository.products).toHaveLength(1);
  });
});

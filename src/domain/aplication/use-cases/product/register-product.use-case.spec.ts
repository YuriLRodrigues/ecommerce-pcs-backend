import { InMemoryProductRepository } from 'test/repositories/in-memory-product.repository';
import { RegisterProductUseCase } from './register-product.use-case';

describe('Add Product - Use Case', () => {
  let sut: RegisterProductUseCase;
  let inMemoryProductRepository: InMemoryProductRepository;

  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new RegisterProductUseCase(inMemoryProductRepository);
  });

  it('should be able to register a new product', async () => {
    const output = await sut.execute({
      name: 'Product 2',
      slug: 'product-2',
      description: 'product-2',
      onSale: true,
      price: 100,
      inStock: true,
      salePrice: 80,
      totalInStock: 10,
    });

    expect(output.isRight()).toBe(true);
    expect(inMemoryProductRepository.products).toHaveLength(1);
    expect(output.value).toEqual(
      expect.objectContaining({
        description: 'product-2',
        onSale: true,
        price: 100,
        inStock: true,
        salePrice: 80,
        totalInStock: 10,
      }),
    );
    expect(inMemoryProductRepository.products[0]).toEqual(
      expect.objectContaining({
        description: 'product-2',
        onSale: true,
        price: 100,
        inStock: true,
        salePrice: 80,
        totalInStock: 10,
      }),
    );
  });
});

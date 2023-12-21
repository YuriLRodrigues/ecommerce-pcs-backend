import { InMemoryProductRepository } from 'test/repositories/in-memory-product.repository';
import { RegisterProductUseCase } from './register-product.use-case';
import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';

describe('Add Product - Use Case', () => {
  let sut: RegisterProductUseCase;
  let inMemoryProductRepository: InMemoryProductRepository;
  const product: ProductEntity = ProductEntity.create({
    name: 'Product 1',
    description: 'product-1',
    price: 100,
  });

  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new RegisterProductUseCase(inMemoryProductRepository);
    inMemoryProductRepository.register({
      product,
    });
  });

  it('should be able to register a new product', async () => {
    const output = await sut.execute({
      name: 'Product 2',
      description: 'product-2',
      onSale: true,
      price: 100,
      inStock: true,
      salePrice: 80,
      totalInStock: 10,
    });

    expect(output.isRight()).toBe(true);
    expect(inMemoryProductRepository.products).toHaveLength(2);
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
    expect(inMemoryProductRepository.products[1]).toEqual(
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

  it('not should be able to create a product with exists slug', async () => {
    const output = await sut.execute({
      name: 'Product 1',
      slug: 'product-1',
      description: 'product-1',
      price: 100,
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error(`Product with this name or slug already exists`));
    expect(inMemoryProductRepository.products).toHaveLength(1);
  });
});

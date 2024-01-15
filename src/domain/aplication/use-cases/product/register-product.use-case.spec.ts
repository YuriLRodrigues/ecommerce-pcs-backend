import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { ImageEntity } from '@root/domain/enterprise/entities/image.entity';
import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';
import { InMemoryImagesRepository } from 'test/repositories/in-memory-images-repository';
import { InMemoryProductRepository } from 'test/repositories/in-memory-product.repository';

import { RegisterProductUseCase } from './register-product.use-case';

describe('Add Product - Use Case', () => {
  let sut: RegisterProductUseCase;
  let inMemoryProductRepository: InMemoryProductRepository;
  let inMemoryImagesRepository: InMemoryImagesRepository;

  const product: ProductEntity = ProductEntity.create({
    name: 'Product 1',
    description: 'product-1',
    price: 100,
  });

  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    inMemoryImagesRepository = new InMemoryImagesRepository();
    sut = new RegisterProductUseCase(inMemoryProductRepository, inMemoryImagesRepository);
    inMemoryProductRepository.register({
      product,
    });
    for (let i = 0; i < 3; i++) {
      const image = ImageEntity.create({
        url: `image-id-${i}`,
        productId: new UniqueEntityId(`product-2`),
      });
      inMemoryImagesRepository.create({
        image,
      });
    }
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
      imagesIds: [],
    });

    expect(output.isRight()).toBe(true);
    expect(inMemoryProductRepository.products).toHaveLength(2);
    expect(output.value).toEqual(inMemoryProductRepository.products[1]);
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

  it('should be able to register a new product with images ids', async () => {
    const output = await sut.execute({
      id: new UniqueEntityId('product-2'),
      name: 'Product 2',
      description: 'product-2',
      price: 100,
      imagesIds: [new UniqueEntityId('image-id-1')],
    });

    expect(output.isRight()).toBe(true);
    expect(inMemoryProductRepository.products).toHaveLength(2);
    expect(output.value).toEqual(inMemoryProductRepository.products[1]);
    expect(inMemoryProductRepository.products[1]).toEqual(
      expect.objectContaining({
        slug: 'product-2',
        description: 'product-2',
        price: 100,
        inStock: false,
        onSale: false,
        salePrice: undefined,
        totalInStock: undefined,
      }),
    );
  });

  it('should not be able to create a product with exists slug', async () => {
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

import { ImageEntity } from '@root/domain/enterprise/entities/image.entity';
import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';
import { InMemoryImagesRepository } from 'test/repositories/in-memory-images-repository';
import { InMemoryProductRepository } from 'test/repositories/in-memory-product.repository';

import { FindImagesByProductSlugUseCase } from './find-image-by-product-slug';

describe('Find Image By ProductId - Use Case', () => {
  let sut: FindImagesByProductSlugUseCase;
  let inMemoryImagesRepository: InMemoryImagesRepository;
  let inMemoryProductRepository: InMemoryProductRepository;

  beforeAll(() => {
    inMemoryImagesRepository = new InMemoryImagesRepository();
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new FindImagesByProductSlugUseCase(inMemoryImagesRepository, inMemoryProductRepository);
  });

  it('should not be able to find an image with invalid product slug', async () => {
    const output = await sut.execute({
      productSlug: 'invalid-slug',
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error(`Product not found`));
  });

  it('should be able to find images on a product without images', async () => {
    const product = ProductEntity.create({
      name: 'product-test-1',
      description: 'test description',
      price: 100,
    });

    inMemoryProductRepository.register({
      product,
    });

    const output = await sut.execute({
      productSlug: product.slug,
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error(`No images found for this product`));
  });

  it('should be able to find an image with your slug', async () => {
    const product = ProductEntity.create({
      name: 'product-test-2',
      description: 'test description',
      price: 100,
    });

    inMemoryProductRepository.register({
      product,
    });

    const image = ImageEntity.create({
      url: 'test',
      productId: product.id,
    });

    inMemoryImagesRepository.create({
      image,
    });

    const output = await sut.execute({
      productSlug: product.slug,
    });

    expect(output.isRight()).toBe(true);
    expect(output.value).toHaveLength(1);
    expect(inMemoryProductRepository.products).toHaveLength(2);
    expect(inMemoryImagesRepository.images).toHaveLength(1);
  });
});

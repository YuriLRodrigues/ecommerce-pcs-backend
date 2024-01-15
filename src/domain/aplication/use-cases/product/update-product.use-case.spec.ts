import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { ImageEntity } from '@root/domain/enterprise/entities/image.entity';
import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';
import { InMemoryImagesRepository } from 'test/repositories/in-memory-images-repository';
import { InMemoryProductRepository } from 'test/repositories/in-memory-product.repository';

import { UpdateProductUseCase } from './update-product.use-case';

describe('Update Product - Use Case', () => {
  let sut: UpdateProductUseCase;
  let inMemoryImagesRepository: InMemoryImagesRepository;
  let inMemoryProductRepository: InMemoryProductRepository;
  let product: ProductEntity;
  beforeEach(() => {
    inMemoryImagesRepository = new InMemoryImagesRepository();
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new UpdateProductUseCase(inMemoryImagesRepository, inMemoryProductRepository);

    product = ProductEntity.create({
      name: `Product`,
      description: `Product description`,
      price: 100,
    });

    inMemoryProductRepository.register({
      product,
    });

    for (let i = 0; i < 3; i++) {
      const image = ImageEntity.create(
        {
          url: `Image-url-${i + 1}`,
          productId: product.id,
        },
        new UniqueEntityId(`image-id-${i + 1}`),
      );

      inMemoryImagesRepository.create({
        image,
      });
    }
  });

  it('should be able to change some product data', async () => {
    const image4 = ImageEntity.create(
      {
        url: `Image-url-4`,
      },
      new UniqueEntityId(`image-id-4`),
    );

    inMemoryImagesRepository.create({
      image: image4,
    });

    const imageIds = ['image-id-1', 'image-id-4'];

    const output = await sut.execute({
      imagesIds: imageIds.map((id) => new UniqueEntityId(id)),
      productId: product.id,
      description: 'product with new images',
      name: 'Product with images',
    });

    expect(output.isRight()).toBe(true);
    expect(inMemoryProductRepository.products[0]).toEqual(
      expect.objectContaining({
        name: 'Product with images',
        description: 'product with new images',
      }),
    );
    expect(inMemoryImagesRepository.images).toHaveLength(2);
  });

  it(`should not be possible to edit a product's information if it doesn't exist`, async () => {
    const newImage = ImageEntity.create({
      url: 'Image-url-test',
    });

    const output = await sut.execute({
      productId: new UniqueEntityId(),
      imagesIds: [newImage.id],
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error(`Product not found`));
  });
});

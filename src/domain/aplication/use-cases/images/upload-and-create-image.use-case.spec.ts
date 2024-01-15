import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';
import { InMemoryImagesRepository } from 'test/repositories/in-memory-images-repository';
import { InMemoryProductRepository } from 'test/repositories/in-memory-product.repository';
import { InMemoryUploaderRepository } from 'test/repositories/in-memory-uploader.repository';

import { UploadAndCreateImageUseCase } from './upload-and-create-image.use-case';

describe('Upload And Create Image - Use Case', () => {
  let sut: UploadAndCreateImageUseCase;
  let inMemoryImagesRepository: InMemoryImagesRepository;
  let inMemoryUploaderRepository: InMemoryUploaderRepository;
  let inMemoryProductRepository: InMemoryProductRepository;

  beforeEach(() => {
    inMemoryImagesRepository = new InMemoryImagesRepository();
    inMemoryUploaderRepository = new InMemoryUploaderRepository();
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new UploadAndCreateImageUseCase(inMemoryImagesRepository, inMemoryUploaderRepository);
  });

  it('should be able to create an image without productId', async () => {
    const output = await sut.execute({
      image: {
        body: Buffer.from(''),
        fileName: 'test-image.png',
        fileType: 'image/png',
      },
    });

    expect(output.isRight()).toBe(true);
    expect(inMemoryImagesRepository.images).toHaveLength(1);
    expect(inMemoryImagesRepository.images[0].productId).toBe(undefined);
  });

  it('should be able to create an image with productId', async () => {
    const product = ProductEntity.create({
      name: 'test-product',
      description: 'test description',
      price: 100,
    });
    inMemoryProductRepository.register({
      product,
    });

    const output = await sut.execute({
      image: {
        body: Buffer.from(''),
        fileName: 'test-image.png',
        fileType: 'image/png',
      },
      productId: product.id,
    });

    expect(output.isRight()).toBe(true);
    expect(inMemoryImagesRepository.images).toHaveLength(1);
    expect(inMemoryImagesRepository.images[0].productId).toEqual(product.id);
  });

  it('should not be able to create an image with an invalid type', async () => {
    const output = await sut.execute({
      image: {
        body: Buffer.from(''),
        fileName: 'test-image.png',
        fileType: 'image/html',
      },
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error(`Invalid image type`));
  });
});

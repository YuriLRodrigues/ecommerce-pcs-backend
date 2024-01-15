import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { ImageEntity } from '@root/domain/enterprise/entities/image.entity';
import { InMemoryImagesRepository } from 'test/repositories/in-memory-images-repository';

import { FindImageByIdUseCase } from './find-image-by-id.use-case';

describe('Find Image By Id - Use Case', () => {
  let sut: FindImageByIdUseCase;
  let inMemoryImagesRepository: InMemoryImagesRepository;

  beforeAll(() => {
    inMemoryImagesRepository = new InMemoryImagesRepository();
    sut = new FindImageByIdUseCase(inMemoryImagesRepository);
  });

  it('should not be able to find an image with invalid id', async () => {
    const invalidId = new UniqueEntityId();

    const output = await sut.execute({
      imageId: invalidId,
    });

    expect(output.isLeft()).toBe(true);
    expect(inMemoryImagesRepository.images).toHaveLength(0);
    expect(output.value).toEqual(new Error(`This image doesn't exist`));
  });

  it('should be able to find an image with your id', async () => {
    const image = ImageEntity.create({
      url: 'test',
    });

    inMemoryImagesRepository.create({
      image,
    });

    const output = await sut.execute({
      imageId: image.id,
    });

    expect(output.isRight()).toBe(true);
    expect(output.value).toEqual(
      expect.objectContaining({
        url: image.url,
      }),
    );
    expect(inMemoryImagesRepository.images).toHaveLength(1);
  });
});

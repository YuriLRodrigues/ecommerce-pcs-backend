import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { ImageEntity } from '@root/domain/enterprise/entities/image.entity';
import { InMemoryImagesRepository } from 'test/repositories/in-memory-images-repository';

import { DeleteImageByIdUseCase } from './delete-image-by-id.use-case';

describe('Delete Image - Use Case', () => {
  let sut: DeleteImageByIdUseCase;
  let inMemoryImagesRepository: InMemoryImagesRepository;

  const image = ImageEntity.create({
    url: 'image-test',
  });

  beforeEach(() => {
    inMemoryImagesRepository = new InMemoryImagesRepository();
    sut = new DeleteImageByIdUseCase(inMemoryImagesRepository);
    inMemoryImagesRepository.create({
      image,
    });
  });

  it('should be able to delete a exists image by your id', async () => {
    const output = await sut.execute({
      imageId: image.id,
    });

    expect(output.isRight()).toBe(true);
    expect(inMemoryImagesRepository.images).toHaveLength(0);
  });
  it('should not be able to delete a image with invalid id', async () => {
    const invalidID = new UniqueEntityId();

    const output = await sut.execute({
      imageId: invalidID,
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error(`Image not found`));
    expect(inMemoryImagesRepository.images).toHaveLength(1);
  });
});

import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { ImageEntity } from '@root/domain/enterprise/entities/image.entity';
import { InMemoryImagesRepository } from 'test/repositories/in-memory-images-repository';

import { FindManyImagesByIdsUseCase } from './find-many-images-by-ids.use-case';

describe('Find Many Images By Ids - Use Case', () => {
  let sut: FindManyImagesByIdsUseCase;
  let inMemoryImagesRepository: InMemoryImagesRepository;

  beforeEach(() => {
    inMemoryImagesRepository = new InMemoryImagesRepository();
    sut = new FindManyImagesByIdsUseCase(inMemoryImagesRepository);
  });

  it('should not be able to find the images with all the wrong ids', async () => {
    const invalidIds: UniqueEntityId[] = [];

    for (let i = 0; i < 6; i++) {
      const id = new UniqueEntityId();
      invalidIds.push(id);
    }

    const output = await sut.execute({
      ids: invalidIds,
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error(`No images found`));
  });

  it('should be able to find multiple images by their ids', async () => {
    const ids: UniqueEntityId[] = [];
    for (let i = 0; i < 6; i++) {
      const image = ImageEntity.create({
        url: `http://${i}-test.com`,
      });
      ids.push(image.id);
      inMemoryImagesRepository.create({
        image,
      });
    }

    const output = await sut.execute({
      ids: [],
    });

    expect(output.isRight()).toBe(true);
    expect(output.value).toHaveLength(6);
    expect(output.value).toEqual(expect.arrayContaining(inMemoryImagesRepository.images));
  });
});

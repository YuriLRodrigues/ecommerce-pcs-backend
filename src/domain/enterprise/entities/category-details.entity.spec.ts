import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';

import { CategoryDetailsEntity } from './category-details.entity';
import { ImageEntity } from './image.entity';

describe('Category Details - Entity', () => {
  it('should be able to create a category details with image', () => {
    const image = ImageEntity.create({
      url: 'test',
    });

    const categoryDetails = CategoryDetailsEntity.create({
      image: {
        id: image.id,
        url: image.url,
      },
      name: 'Category Details Test',
    });

    expect(categoryDetails.id).toBeInstanceOf(UniqueEntityId);
    expect(categoryDetails.name).toBe('Category Details Test');
    expect(categoryDetails.slug).toBe('category-details-test');
    expect(categoryDetails.image).toEqual(
      expect.objectContaining({
        id: image.id,
        url: image.url,
      }),
    );
  });
});

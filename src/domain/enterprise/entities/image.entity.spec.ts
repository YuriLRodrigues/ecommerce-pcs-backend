import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';

import { ImageEntity } from './image.entity';

describe('Image - Entity', () => {
  it('should be able to create an image with only url', () => {
    const image = ImageEntity.create({
      url: 'test-url',
    });

    expect(image.id).toBeInstanceOf(UniqueEntityId);
    expect(image.url).toBe('test-url');
    expect(image.categoryId).toBe(undefined);
    expect(image.productId).toBe(undefined);
  });

  it('should be able to edit the product id of an image after it has been created', () => {
    const image = ImageEntity.create({
      url: 'test-url',
    });
    image.productId = new UniqueEntityId('test-product-id');

    expect(image.productId.toValue()).toEqual('test-product-id');
    expect(image.productId).toBeInstanceOf(UniqueEntityId);
  });

  it('should be able to edit the category id of an image after it has been created', () => {
    const image = ImageEntity.create({
      url: 'test-url',
    });
    image.categoryId = new UniqueEntityId('test-category-id');

    expect(image.categoryId.toValue()).toEqual('test-category-id');
    expect(image.categoryId).toBeInstanceOf(UniqueEntityId);
  });
});

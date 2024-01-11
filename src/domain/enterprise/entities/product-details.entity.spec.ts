import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';

import { ImageEntity } from './image.entity';
import { ProductDetailsEntity } from './product-details.entity';

describe('Category Details - Entity', () => {
  it('should be able to create a product details with image', () => {
    const image = ImageEntity.create({
      url: 'test',
    });

    const categoryDetails = ProductDetailsEntity.create({
      name: 'Product Test',
      description: 'test description',
      images: [image],
      price: 100,
    });

    expect(categoryDetails.id).toBeInstanceOf(UniqueEntityId);
    expect(categoryDetails.images).toHaveLength(1);
    expect(categoryDetails.name).toBe('Product Test');
    expect(categoryDetails.slug).toBe('product-test');
    expect(categoryDetails.price).toBe(100);
    expect(categoryDetails.inStock).toBe(false);
    expect(categoryDetails.onSale).toBe(false);
    expect(categoryDetails.salePrice).toBe(undefined);
    expect(categoryDetails.totalInStock).toEqual(undefined);
  });
});

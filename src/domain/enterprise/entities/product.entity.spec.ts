import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { ProductEntity } from './product.entity';

describe('Product - Entity', () => {
  it('should be able to create a product without be in promotion', async () => {
    const product = await ProductEntity.create({
      description: 'Product description',
      images: ['image-1', 'image-2'],
      onSale: false,
      price: 1500,
    });

    expect(product.description).toBe('Product description');
    expect(product.images.length).toEqual(2);
    expect(product.price).toEqual(1500);
    expect(product.salePrice).toEqual(null);
    expect(product.onSale).toBe(false);
  });

  it('should be able to create a product with promotion', async () => {
    const product = await ProductEntity.create({
      description: 'Product description with promotion',
      images: ['image-1', 'image-2', 'image-3'],
      onSale: true,
      price: 1800,
      salePrice: 850,
    });

    expect(product.description).toBe('Product description with promotion');
    expect(product.images.length).toEqual(3);
    expect(product.price).toEqual(1800);
    expect(product.salePrice).toEqual(850);
    expect(product.onSale).toBe(true);
  });

  it('should be able to create a product with id', async () => {
    const randomId = new UniqueEntityId();

    const product = await ProductEntity.create(
      {
        description: 'Product description with randomId',
        images: ['image-1', 'image-2', 'image-3'],
        onSale: true,
        price: 1800,
        salePrice: 850,
      },
      randomId,
    );

    expect(product.description).toBe('Product description with randomId');
    expect(product.images.length).toEqual(3);
    expect(product.price).toEqual(1800);
    expect(product.salePrice).toEqual(850);
    expect(product.onSale).toBe(true);
  });
});

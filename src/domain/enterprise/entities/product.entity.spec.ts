import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';

import { ProductEntity } from './product.entity';

describe('Product - Entity', () => {
  it('should be able to create a product without be in promotion', async () => {
    const product = await ProductEntity.create({
      name: 'Product',
      description: 'Product description',
      price: 1500,
    });

    expect(product.name).toBe('Product');
    expect(product.slug).toBe('product');
    expect(product.description).toBe('Product description');
    expect(product.price).toEqual(1500);
    expect(product.salePrice).toEqual(undefined);
    expect(product.onSale).toBe(false);
    expect(product.inStock).toBe(false);
    expect(product.totalInStock).toEqual(undefined);
  });

  it('should be able to create a product with promotion', async () => {
    const product = await ProductEntity.create({
      name: 'Product',
      description: 'Product description with promotion',
      onSale: true,
      price: 1800,
      salePrice: 850,
      inStock: true,
      totalInStock: 3,
    });

    expect(product.name).toBe('Product');
    expect(product.slug).toBe('product');
    expect(product.description).toBe('Product description with promotion');
    expect(product.price).toEqual(1800);
    expect(product.salePrice).toEqual(850);
    expect(product.onSale).toBe(true);
    expect(product.inStock).toBe(true);
    expect(product.totalInStock).toEqual(3);
  });

  it('should be able to create a product with id', async () => {
    const randomId = new UniqueEntityId();

    const product = await ProductEntity.create(
      {
        name: 'Product',
        slug: 'product',
        description: 'Product description',
        price: 1500,
      },
      randomId,
    );

    expect(product.id).toBe(randomId);
    expect(product.name).toBe('Product');
    expect(product.slug).toBe('product');
    expect(product.description).toBe('Product description');
    expect(product.price).toEqual(1500);
    expect(product.salePrice).toEqual(undefined);
    expect(product.onSale).toBe(false);
    expect(product.inStock).toBe(false);
    expect(product.totalInStock).toEqual(undefined);
  });
});

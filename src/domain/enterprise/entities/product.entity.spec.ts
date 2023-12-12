import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { ProductEntity } from './product.entity';

describe('Product - Entity', () => {
  it('should be able to create a product without be in promotion', async () => {
    const product = await ProductEntity.create({
      description: 'Product description',
      onSale: false,
      price: 1500,
      inStock: true,
      totalInStock: 2,
      stars: [1, 5, 3],
    });

    expect(product.description).toBe('Product description');
    expect(product.price).toEqual(1500);
    expect(product.salePrice).toEqual(null);
    expect(product.onSale).toBe(false);
    expect(product.inStock).toBe(true);
    expect(product.stars).toEqual(expect.arrayContaining([1, 5, 3]));
    expect(product.totalInStock).toEqual(2);
  });

  it('should be able to create a product with promotion', async () => {
    const product = await ProductEntity.create({
      description: 'Product description with promotion',
      onSale: true,
      price: 1800,
      salePrice: 850,
      inStock: true,
      stars: [1, 5, 3],
      totalInStock: 3,
    });

    expect(product.description).toBe('Product description with promotion');
    expect(product.price).toEqual(1800);
    expect(product.salePrice).toEqual(850);
    expect(product.onSale).toBe(true);
    expect(product.inStock).toBe(true);
    expect(product.stars).toEqual(expect.arrayContaining([1, 5, 3]));
    expect(product.totalInStock).toEqual(3);
  });

  it('should be able to create a product with id', async () => {
    const randomId = new UniqueEntityId();

    const product = await ProductEntity.create(
      {
        description: 'Product description with randomId',
        onSale: true,
        price: 1800,
        salePrice: 850,
        inStock: true,
        stars: [1, 4, 5],
        totalInStock: 5,
      },
      randomId,
    );

    expect(product.description).toBe('Product description with randomId');
    expect(product.price).toEqual(1800);
    expect(product.salePrice).toEqual(850);
    expect(product.onSale).toBe(true);
    expect(product.inStock).toBe(true);
    expect(product.stars).toEqual(expect.arrayContaining([1, 4, 5]));
    expect(product.totalInStock).toEqual(5);
  });
});

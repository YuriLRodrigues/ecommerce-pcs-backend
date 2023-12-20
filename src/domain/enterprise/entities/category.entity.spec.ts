import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { CategoryEntity } from './category.entity';
import { ProductEntity } from './product.entity';

describe('Category - Entity', () => {
  it('should be able to create a category with only your name and de rest automatic', () => {
    const category = CategoryEntity.create({
      name: 'PCS',
    });

    expect(category.id).toBeInstanceOf(UniqueEntityId);
    expect(category.name).toBe('PCS');
    expect(category.slug).toBe('pcs');
    expect(category.createdAt).toBeInstanceOf(Date);
  });

  it('should be able to create a category with all data excepct products', () => {
    const category = CategoryEntity.create({
      name: 'PCS-2',
      slug: 'pcss2',
      createdAt: new Date(),
    });

    expect(category.id).toBeInstanceOf(UniqueEntityId);
    expect(category.name).toBe('PCS-2');
    expect(category.slug).toBe('pcss2');
    expect(category.createdAt).toBeInstanceOf(Date);
  });

  it('should be able to create a category with products', () => {
    const product = ProductEntity.create({
      name: 'Product',
      slug: 'product',
      description: 'Product description',
      price: 1500,
    });

    const category = CategoryEntity.create({
      name: 'PCS-2',
      slug: 'pcss2',
      createdAt: new Date(),
      products: [product],
    });

    expect(category.id).toBeInstanceOf(UniqueEntityId);
    expect(category.name).toBe('PCS-2');
    expect(category.slug).toBe('pcss2');
    expect(category.products).toHaveLength(1);
    expect(category.products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Product',
          slug: 'product',
          description: 'Product description',
          price: 1500,
        }),
      ]),
    );
    expect(category.createdAt).toBeInstanceOf(Date);
  });
});

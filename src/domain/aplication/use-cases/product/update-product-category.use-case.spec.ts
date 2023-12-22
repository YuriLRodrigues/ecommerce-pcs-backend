import { InMemoryProductRepository } from 'test/repositories/in-memory-product.repository';
import { UpdateProductCategoryUseCase } from './update-product-category.use-case';
import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';
import { InMemoryCategoryRepository } from 'test/repositories/in-memory-category.repository';
import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';

describe('Update Product - Use Case', () => {
  let sut: UpdateProductCategoryUseCase;
  let inMemoryProductRepository: InMemoryProductRepository;
  let inMemoryCategoryRepository: InMemoryCategoryRepository;

  const categoryPhones = CategoryEntity.create({
    name: 'Celulares',
  });

  const categoryPC = CategoryEntity.create({
    name: 'Computers',
  });

  const product = ProductEntity.create({
    name: 'Product 1',
    description: 'product-1',
    price: 100,
    categoryId: categoryPhones.id.toValue(),
  });

  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    sut = new UpdateProductCategoryUseCase(inMemoryProductRepository, inMemoryCategoryRepository);
    inMemoryProductRepository.register({
      product,
    });
    inMemoryCategoryRepository.createCategory({
      category: categoryPhones,
    });
    inMemoryCategoryRepository.createCategory({
      category: categoryPC,
    });
  });

  it('not should be able to update the product category with invalid categoryId', async () => {
    const output = await sut.execute({
      categoryId: 'invalid-category-id',
      productSlug: product.slug,
    });

    expect(output.isLeft()).toBe(true);
    expect(inMemoryProductRepository.products[0].categoryId).toEqual(categoryPhones.id.toValue());
    expect(output.value).toEqual(new Error('This category does not exist'));
  });

  it('not should be able to update the product category with invalid productSlug', async () => {
    const output = await sut.execute({
      categoryId: categoryPC.id.toValue(),
      productSlug: 'slug-invalid',
    });

    expect(output.isLeft()).toBe(true);
    expect(inMemoryProductRepository.products[0].categoryId).toEqual(categoryPhones.id.toValue());
    expect(output.value).toEqual(new Error('This product does not exist'));
  });

  it('should be able to update the product category', async () => {
    const output = await sut.execute({
      categoryId: categoryPC.id.toValue(),
      productSlug: product.slug,
    });

    expect(output.isRight()).toBe(true);
    expect(inMemoryProductRepository.products[0].categoryId).toEqual(categoryPC.id.toValue());
  });
});

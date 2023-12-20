import {
  DeleteProductProps,
  FindAllProductsProps,
  FindProductBySlugProps,
  FindProductsByCategoryProps,
  ProductRepository,
  RegisterProductProps,
} from '@root/domain/aplication/repositories/product.repository';
import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';

export class InMemoryProductRepository extends ProductRepository {
  // constructor(private readonly categoryRepository: CategoryRepository) {}
  public products: ProductEntity[] = [];

  async register({ product }: RegisterProductProps): Promise<ProductEntity> {
    await this.products.push(product);
    return product;
  }

  async delete({ id }: DeleteProductProps): Promise<void> {
    this.products = this.products.filter((prod) => prod.id.toValue() !== id);
    return;
  }

  async findProductBySlug({ slug }: FindProductBySlugProps): Promise<ProductEntity> {
    const productBySlug = this.products.find((prod) => prod.slug === slug);
    return productBySlug ?? null;
  }

  async findProductByCategory({ slug }: FindProductsByCategoryProps): Promise<ProductEntity[]> {
    const productByCategory = this.products.find((prod) => prod.productCategoryId === slug);
    return productByCategory ?? null;
  }

  async findAllProducts({ limit, page }: FindAllProductsProps): Promise<ProductEntity[]> {
    return this.products.slice((page - 1) * limit, limit * page);
  }
}

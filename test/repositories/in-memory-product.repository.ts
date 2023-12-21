import {
  DeleteProductProps,
  FindAllProductsProps,
  FindProductsByCategoryProps,
  FindProductBySlugProps,
  ProductRepository,
  RegisterProductProps,
  SaveProductProps,
} from '@root/domain/aplication/repositories/product.repository';
import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';

export class InMemoryProductRepository extends ProductRepository {
  public products: ProductEntity[] = [];

  async register({ product }: RegisterProductProps): Promise<ProductEntity> {
    await this.products.push(product);
    return product;
  }

  async delete({ productSlug }: DeleteProductProps): Promise<void> {
    this.products = this.products.filter((prod) => prod.slug !== productSlug);
    return;
  }

  async findProductBySlug({ slug }: FindProductBySlugProps): Promise<ProductEntity> {
    const productBySlug = this.products.find((prod) => prod.slug === slug);
    return productBySlug ?? null;
  }

  async findAllProducts({ limit, page }: FindAllProductsProps): Promise<ProductEntity[]> {
    return this.products.slice((page - 1) * limit, limit * page);
  }

  async save({ product }: SaveProductProps): Promise<void> {
    const productIndex = await this.products.findIndex((prod) => prod.id === product.id);

    product[productIndex] = product;
    return;
  }

  async findProductsByCategory({ categorySlug }: FindProductsByCategoryProps): Promise<ProductEntity[]> {
    const products = await this.products.filter((p) => p.categoryId === categorySlug);
    return products ?? null;
  }
}

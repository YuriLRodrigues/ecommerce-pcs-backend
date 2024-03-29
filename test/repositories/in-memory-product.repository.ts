import {
  DeleteProductProps,
  FindAllProductsProps,
  FindProductsByCategoryProps,
  FindProductBySlugProps,
  ProductRepository,
  RegisterProductProps,
  SaveProductProps,
  FindProductByIdProps,
} from '@root/domain/aplication/repositories/product.repository';
import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';
import { createSlug } from '@root/utils/create-slug';

export class InMemoryProductRepository implements ProductRepository {
  public products: ProductEntity[] = [];

  async register({ product }: RegisterProductProps): Promise<ProductEntity> {
    await this.products.push(product);

    return product;
  }

  async delete({ productSlug }: DeleteProductProps): Promise<void> {
    this.products = this.products.filter((prod) => prod.slug !== productSlug);

    return;
  }

  async findProductById({ id }: FindProductByIdProps): Promise<ProductEntity> {
    const productById = this.products.find((prod) => prod.id === id);

    return productById ?? null;
  }

  async findProductBySlug({ slug }: FindProductBySlugProps): Promise<ProductEntity> {
    const productBySlug = this.products.find((prod) => prod.slug === slug);

    return productBySlug ?? null;
  }

  async findProductsByCategory({
    categoryId,
    inStock,
    limit,
    page,
  }: FindProductsByCategoryProps): Promise<ProductEntity[]> {
    const products = await this.products.filter((p) => p.categoryId === categoryId);

    const productsPaginated = products.slice((page - 1) * limit, limit * page);

    return productsPaginated.filter((prod) => prod.inStock === inStock);
  }

  async findAllProducts({ limit, page, inStock, search }: FindAllProductsProps): Promise<ProductEntity[]> {
    if (search) {
      const productsSearched = this.products.filter((prod) => prod.slug === createSlug(search));

      if (inStock) {
        const productsFiltered = productsSearched.filter((prod) => prod.inStock === inStock);

        return productsFiltered.slice((page - 1) * limit, limit * page);
      }

      return productsSearched.slice((page - 1) * limit, limit * page);
    }

    if (inStock) {
      const productsFiltered = this.products.filter((prod) => prod.inStock === inStock);

      return productsFiltered.slice((page - 1) * limit, limit * page);
    }

    return this.products.slice((page - 1) * limit, limit * page);
  }

  async save({ product }: SaveProductProps): Promise<void> {
    const productIndex = await this.products.findIndex((prod) => prod.id === product.id);

    this.products[productIndex] = product;

    return;
  }
}

import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';

export type FindProductBySlugProps = {
  slug: string;
};

export type DeleteProductProps = {
  productSlug: string;
};

export type RegisterProductProps = {
  product: ProductEntity;
};

export type FindAllProductsProps = {
  limit: number;
  page: number;
  inStock?: boolean;
};

export type ChangeProductCategoryProps = {
  currentCategoryId: string;
  newCategoryId: string;
};

export type ChangeProductInfoProps = {
  currentCategoryId: string;
  newCategoryId: string;
};

export type SaveProductProps = {
  product: ProductEntity;
};

export type FindProductsByCategoryProps = {
  categorySlug: string;
};

export abstract class ProductRepository {
  abstract register({ product }: RegisterProductProps): Promise<ProductEntity>;
  abstract findProductBySlug({ slug }: FindProductBySlugProps): Promise<ProductEntity | null>;
  abstract findAllProducts({ limit, page, inStock }: FindAllProductsProps): Promise<ProductEntity[]>;
  abstract delete({ productSlug }: DeleteProductProps): Promise<void>;
  abstract save({ product }: SaveProductProps): Promise<void>;
  abstract findProductsByCategory({ categorySlug }: FindProductsByCategoryProps): Promise<ProductEntity[]>;
}

import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';

export type FindProductBySlugProps = {
  slug: string;
};

export type DeleteProductProps = {
  id: string;
};

export type RegisterProductProps = {
  product: ProductEntity;
};

export type FindAllProductsProps = {
  limit: number;
  page: number;
};

export type FindProductsByCategoryProps = {
  slug: string;
};

export abstract class ProductRepository {
  abstract register(data: RegisterProductProps): Promise<ProductEntity>;
  abstract findProductBySlug({ slug }: FindProductBySlugProps): Promise<ProductEntity | null>;
  abstract findProductByCategory({ slug }: FindProductsByCategoryProps): Promise<ProductEntity[]>;
  abstract findAllProducts({ limit, page }: FindAllProductsProps): Promise<ProductEntity[]>;
  abstract delete(data: DeleteProductProps): Promise<void>;
}

// export type AddFeedbackProps = {
//   stars: number;
//   productId: string;
//   comment: string;
// };

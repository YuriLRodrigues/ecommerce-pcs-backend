import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';

export type FindProductByIdProps = {
  id: string;
};

export type DeleteProductProps = {
  id: string;
};

export type RegisterProductProps = {
  description: string;
  price: number;
  salePrice?: number;
  onSale: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  stars: Array<number>;
  inStock: boolean;
  totalInStock: number;
};

export abstract class ProductRepository {
  abstract findProductById({ id }: FindProductByIdProps): Promise<ProductEntity | null>;
  abstract register(data: RegisterProductProps): Promise<ProductEntity>;
  abstract delete(data: DeleteProductProps): Promise<void>;
}

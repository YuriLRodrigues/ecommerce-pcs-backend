import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product.repository';
import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';
import { Either, left, right } from '@root/core/logic/Either';

type Input = {
  name: string;
  slug?: string;
  description: string;
  price: number;
  salePrice?: number;
  onSale?: boolean;
  inStock?: boolean;
  totalInStock?: number;
};

type Output = Either<Error, ProductEntity>;

@Injectable()
export class RegisterProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({
    description,
    onSale,
    price,
    salePrice,
    inStock,
    totalInStock,
    name,
    slug,
  }: Input): Promise<Output> {
    const productExists = await this.productRepository.findProductBySlug({
      slug,
    });

    if (productExists) {
      return left(new Error('Product with this name or slug already exists'));
    }

    const product = ProductEntity.create({
      name,
      slug,
      description,
      onSale,
      price,
      salePrice,
      inStock,
      totalInStock,
    });

    const newProduct = await this.productRepository.register({
      product,
    });

    return right(newProduct);
  }
}

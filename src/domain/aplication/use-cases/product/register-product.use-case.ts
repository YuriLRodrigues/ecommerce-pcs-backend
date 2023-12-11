import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product.repository';
import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';
import { Either, left, right } from '@root/core/logic/Either';

type Input = {
  description: string;
  price: number;
  salePrice?: number;
  onSale: boolean;
  stars: Array<number>;
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
    stars,
    salePrice,
    inStock,
    totalInStock,
  }: Input): Promise<Output> {
    const product = ProductEntity.create({
      description,
      onSale,
      price,
      stars,
      salePrice,
      inStock,
      totalInStock,
    });

    const productAlreadyExists = await this.productRepository.findProductById({
      id: product.id.toValue(),
    });

    if (productAlreadyExists) {
      return left(new Error('Product already exists'));
    }

    const newProduct = await this.productRepository.register(product);

    return right(newProduct);
  }
}

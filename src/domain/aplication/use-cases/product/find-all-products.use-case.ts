import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product.repository';
import { Either, left, right } from '@root/core/logic/Either';
import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';

type Output = Either<Error, ProductEntity[]>;

type Input = {
  limit: number;
  page: number;
};

@Injectable()
export class FindAllProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({ limit, page }: Input): Promise<Output> {
    const products = await this.productRepository.findAllProducts({
      limit,
      page,
    });

    if (products.length === 0) {
      return left(new Error('No product was found'));
    }

    return right(products);
  }
}

import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@root/core/logic/Either';
import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';

import { ProductRepository } from '../../repositories/product.repository';

type Output = Either<Error, ProductEntity[]>;

type Input = {
  limit: number;
  page: number;
  inStock?: boolean | undefined;
  search?: string | undefined;
};

@Injectable()
export class FindAllProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({ limit, page, inStock, search }: Input): Promise<Output> {
    const products = await this.productRepository.findAllProducts({
      limit,
      page,
      inStock,
      search,
    });

    if (products.length === 0) {
      return left(new Error('No product was found'));
    }

    return right(products);
  }
}

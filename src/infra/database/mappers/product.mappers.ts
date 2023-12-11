import { Prisma, Product } from '@prisma/client';
import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';

export class ProductMappers {
  static toDomain(data: Product): ProductEntity {
    return ProductEntity.create({
      description: data.description,
      onSale: data.onSale,
      price: data.price,
      stars: data.stars,
      salePrice: data.salePrice,
    });
  }

  static toPersistence(data: ProductEntity): Prisma.ProductCreateInput {
    return {
      description: data.description,
      onSale: data.onSale,
      price: data.price,
      stars: data.stars,
    };
  }
}

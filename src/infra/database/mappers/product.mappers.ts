import { Prisma, Product } from '@prisma/client';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';

export class ProductMappers {
  static toDomain(data: Product): ProductEntity {
    return ProductEntity.create(
      {
        name: data.name,
        slug: data.slug,
        description: data.description,
        onSale: data.onSale,
        price: data.price,
        salePrice: data.salePrice,
        inStock: data.inStock,
        totalInStock: data.totalInStock,
        categoryId: data.categoryId,
      },
      new UniqueEntityId(data.id),
    );
  }

  static toPersistence(data: ProductEntity): Prisma.ProductCreateInput {
    return {
      id: data.id.toValue(),
      name: data.name,
      slug: data.slug,
      description: data.description,
      onSale: data.onSale,
      price: data.price,
      inStock: data.inStock,
      totalInStock: data.totalInStock,
      salePrice: data.salePrice,
      category: {
        connect: {
          id: data.categoryId ?? undefined,
        },
      },
    };
  }
}

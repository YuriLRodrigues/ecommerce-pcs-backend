import {
  DeleteProductProps,
  FindProductByIdProps,
  ProductRepository,
  RegisterProductProps,
} from '@root/domain/aplication/repositories/product.repository';
import { ProductEntity } from '@root/domain/enterprise/entities/product.entity';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { ProductMappers } from '../mappers/product.mappers';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findProductById({ id }: FindProductByIdProps): Promise<ProductEntity> {
    const product = await this.prismaService.product.findFirst({
      where: {
        id,
      },
    });

    if (!product) {
      return null;
    }

    return ProductMappers.toDomain(product);
  }

  async register({
    description,
    onSale,
    price,
    salePrice,
    stars,
    inStock,
    totalInStock,
  }: RegisterProductProps): Promise<ProductEntity> {
    const product = await this.prismaService.product.create({
      data: {
        description,
        onSale,
        price,
        salePrice,
        stars,
        inStock,
        totalInStock,
      },
    });

    if (!product) {
      return null;
    }

    return ProductMappers.toDomain(product);
  }

  async delete({ id }: DeleteProductProps): Promise<void> {
    await this.prismaService.product.delete({
      where: {
        id,
      },
    });
    return;
  }
}

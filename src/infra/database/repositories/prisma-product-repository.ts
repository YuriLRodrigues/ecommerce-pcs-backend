import {
  DeleteProductProps,
  FindAllProductsProps,
  FindProductBySlugProps,
  FindProductsByCategoryProps,
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

  async register({ product }: RegisterProductProps): Promise<ProductEntity> {
    const raw = ProductMappers.toPersistence(product);

    const newProduct = await this.prismaService.product.create({
      data: raw,
    });

    if (!newProduct) {
      return null;
    }

    return ProductMappers.toDomain(newProduct);
  }

  async findProductBySlug({ slug }: FindProductBySlugProps): Promise<ProductEntity> {
    const product = await this.prismaService.product.findFirst({
      where: {
        slug,
      },
    });

    if (!product) {
      return null;
    }

    return ProductMappers.toDomain(product);
  }

  async findAllProducts({ limit, page }: FindAllProductsProps): Promise<ProductEntity[]> {
    const products = await this.prismaService.product.findMany({
      skip: page,
      take: limit,
    });

    if (products.length === 0) {
      return null;
    }

    const mappedProducts = products.map((product) => {
      return ProductMappers.toDomain(product);
    });

    return mappedProducts;
  }

  async findProductByCategory({ slug }: FindProductsByCategoryProps): Promise<ProductEntity[]> {
    const products = await this.prismaService.product.findMany({
      where: {
        category: {
          slug,
        },
      },
    });

    if (products.length === 0) {
      return null;
    }

    const mappedProducts = products.map((product) => ProductMappers.toDomain(product));

    return mappedProducts;
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

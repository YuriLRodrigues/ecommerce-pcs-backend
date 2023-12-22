import {
  DeleteProductProps,
  FindAllProductsProps,
  FindProductBySlugProps,
  FindProductsByCategoryProps,
  ProductRepository,
  RegisterProductProps,
  SaveProductProps,
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

  async findAllProducts({ limit, page, inStock }: FindAllProductsProps): Promise<ProductEntity[]> {
    const products = await this.prismaService.product.findMany({
      skip: page,
      take: limit,
      where: {
        inStock: inStock,
      },
    });

    if (products.length === 0) {
      return null;
    }

    const mappedProducts = products.map((product) => {
      return ProductMappers.toDomain(product);
    });
    return mappedProducts;
  }

  async findProductsByCategory({
    inStock,
    limit,
    page,
    categoryId,
  }: FindProductsByCategoryProps): Promise<ProductEntity[]> {
    const products = await this.prismaService.product.findMany({
      where: {
        categoryId: categoryId,
        inStock: inStock,
      },
      skip: page,
      take: limit,
    });

    if (products.length === 0) {
      return null;
    }

    const productsMappers = products.map((product) => {
      return ProductMappers.toDomain(product);
    });

    return productsMappers;
  }

  async delete({ productSlug }: DeleteProductProps): Promise<void> {
    const productExists = await this.prismaService.product.findFirst({
      where: {
        slug: productSlug,
      },
    });

    if (!productExists) {
      return null;
    }

    await this.prismaService.product.delete({
      where: {
        id: productExists.id,
      },
    });
    return;
  }

  async save({ product }: SaveProductProps): Promise<void> {
    const raw = ProductMappers.toPersistence(product);

    await this.prismaService.product.update({
      where: {
        id: product.id.toValue(),
      },
      data: raw,
    });
  }
}

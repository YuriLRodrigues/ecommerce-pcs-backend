import { Injectable } from '@nestjs/common';
import {
  CategoryRepository,
  createProductInCategoryProps,
  deleteProductInCategoryProps,
  findCategoryByIdProps,
  findCategoryBySlugProps,
  saveProductInCategoryProps,
} from '@root/domain/aplication/repositories/category.repository';
import { PrismaService } from '../prisma.service';
import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';
import { CategoryMappers } from '../mappers/category.mappers';

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async createCategory({ category }: createProductInCategoryProps): Promise<CategoryEntity> {
    const raw = CategoryMappers.toPersistence(category);

    const newCategory = await this.prismaService.category.create({ data: raw });

    return CategoryMappers.toDomain(newCategory);
  }

  async findCategoryBySlug({ categorySlug }: findCategoryBySlugProps): Promise<CategoryEntity> {
    const category = await this.prismaService.category.findFirst({
      where: {
        slug: categorySlug,
      },
    });

    if (!category) {
      return null;
    }

    return CategoryMappers.toDomain(category);
  }

  async findCategoryById({ categoryId }: findCategoryByIdProps): Promise<CategoryEntity> {
    const category = await this.prismaService.category.findFirst({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return null;
    }

    return CategoryMappers.toDomain(category);
  }

  async saveCategory({ category }: saveProductInCategoryProps): Promise<void> {
    const raw = CategoryMappers.toPersistence(category);
    const categoryExists = await this.prismaService.category.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });

    if (!categoryExists) {
      return null;
    }

    return;
  }

  async deleteCategory({ categorySlug }: deleteProductInCategoryProps): Promise<void> {
    const categoryExists = await this.prismaService.category.findFirst({
      where: {
        slug: categorySlug,
      },
    });

    if (!categoryExists) {
      return null;
    }

    await this.prismaService.category.delete({
      where: {
        id: categoryExists.id,
      },
    });

    return;
  }
}

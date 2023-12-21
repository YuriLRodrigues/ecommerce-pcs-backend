import { Category, Prisma } from '@prisma/client';
import { UniqueEntityId } from '@root/core/domain/entity/unique-id.entity';
import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';

export class CategoryMappers {
  static toDomain(data: Category): CategoryEntity {
    return CategoryEntity.create(
      {
        name: data.name,
        createdAt: data.createdAt,
        slug: data.slug,
      },
      new UniqueEntityId(data.id),
    );
  }

  static toPersistence(data: CategoryEntity): Prisma.CategoryCreateInput {
    return {
      id: data.id.toValue(),
      name: data.name,
      slug: data.slug,
      createdAt: data.createdAt,
    };
  }
}

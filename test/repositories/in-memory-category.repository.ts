import {
  CategoryRepository,
  CreateProps,
  DeleteProps,
  FindByIdProps,
  FindBySlugProps,
  SaveProps,
} from '@root/domain/aplication/repositories/category.repository';
import { CategoryDetailsEntity } from '@root/domain/enterprise/entities/category-details.entity';
import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';

import { InMemoryImagesRepository } from './in-memory-images-repository';

export class InMemoryCategoryRepository implements CategoryRepository {
  constructor(private readonly inMemoryImagesRepository: InMemoryImagesRepository) {}

  public categories: CategoryEntity[] = [];

  async create({ category }: CreateProps): Promise<CategoryEntity> {
    this.categories.push(category);

    return category;
  }

  async findBySlug({ categorySlug }: FindBySlugProps): Promise<CategoryEntity> {
    const category = await this.categories.find((cat) => cat.slug === categorySlug);

    return category ?? null;
  }

  async save({ category }: SaveProps): Promise<void> {
    const categoryIndex = await this.categories.findIndex((cat) => cat.id === category.id);

    this.categories[categoryIndex] = category;

    return;
  }

  async delete({ categoryId }: DeleteProps): Promise<void> {
    this.categories = this.categories.filter((cat) => cat.id.toValue() !== categoryId);

    return;
  }

  async findById({ categoryId }: FindByIdProps): Promise<CategoryEntity> {
    const category = await this.categories.find((cat) => cat.id.toValue() === categoryId);

    return category ?? null;
  }

  async findAll(): Promise<CategoryDetailsEntity[]> {
    const images = this.inMemoryImagesRepository.images;

    const categoryDetails = this.categories.map((cat) => {
      const image = images.find((img) => img.categoryId.toValue() === cat.id.toValue());

      return CategoryDetailsEntity.create({
        image: image && {
          url: image.url,
          id: image.id,
        },
        name: cat.name,
        slug: cat.slug,
      });
    });

    return categoryDetails;
  }
}

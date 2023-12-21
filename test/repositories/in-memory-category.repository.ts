import {
  CategoryRepository,
  createProductInCategoryProps,
  deleteProductInCategoryProps,
  findCategoryByIdProps,
  findCategoryBySlugProps,
  saveProductInCategoryProps,
} from '@root/domain/aplication/repositories/category.repository';
import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';

export class InMemoryCategoryRepository extends CategoryRepository {
  public category: CategoryEntity[] = [];

  async createCategory({ category }: createProductInCategoryProps): Promise<CategoryEntity> {
    this.category.push(category);
    return category;
  }

  async findCategoryBySlug({ categorySlug }: findCategoryBySlugProps): Promise<CategoryEntity> {
    const category = await this.category.find((cat) => cat.slug === categorySlug);
    return category ?? null;
  }

  async saveCategory({ category }: saveProductInCategoryProps): Promise<void> {
    const categoryIndex = await this.category.findIndex((cat) => cat.id === category.id);

    category[categoryIndex] = category;
    return;
  }

  async deleteCategory({ categorySlug }: deleteProductInCategoryProps): Promise<void> {
    await this.category.filter((cat) => cat.slug === categorySlug);
    return;
  }

  async findCategoryById({ categoryId }: findCategoryByIdProps): Promise<CategoryEntity> {
    const category = await this.category.find((cat) => cat.id.toValue() === categoryId);

    return category ?? null;
  }
}

import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';

export type findCategoryBySlugProps = {
  categorySlug: string;
};
export type findCategoryByIdProps = {
  categoryId: string;
};

export type deleteProductInCategoryProps = {
  categorySlug: string;
};

export type createProductInCategoryProps = {
  category: CategoryEntity;
};

export type saveProductInCategoryProps = {
  category: CategoryEntity;
};

export abstract class CategoryRepository {
  abstract createCategory({ category }: createProductInCategoryProps): Promise<CategoryEntity>;
  abstract findCategoryBySlug({ categorySlug }: findCategoryBySlugProps): Promise<CategoryEntity>;
  abstract findCategoryById({ categoryId }: findCategoryByIdProps): Promise<CategoryEntity>;
  abstract saveCategory({ category }: saveProductInCategoryProps): Promise<void>;
  abstract deleteCategory({ categorySlug }: deleteProductInCategoryProps): Promise<void>;
}

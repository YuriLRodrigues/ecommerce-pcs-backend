import { CategoryEntity } from '@root/domain/enterprise/entities/category.entity';

export type findCategoryByIdProps = {
  categoryId: string;
};

export type deleteProductInCategoryProps = {
  categoryId: string;
};

export type createProductInCategoryProps = {
  category: CategoryEntity;
};

export type updateProductInCategoryProps = {
  categoryId: string;
  category: CategoryEntity;
};

export abstract class CategoryRepository {
  abstract createCategory({ category }: createProductInCategoryProps): Promise<CategoryEntity>;
  abstract findCategoryById({ categoryId }: findCategoryByIdProps): Promise<CategoryEntity>;
  abstract updateCategory({ category, categoryId }: updateProductInCategoryProps): Promise<CategoryEntity>;
  abstract deleteCategory({ categoryId }: deleteProductInCategoryProps): Promise<void>;
}

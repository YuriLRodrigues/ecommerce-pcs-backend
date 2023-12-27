import { Module } from '@nestjs/common';
import { CreateCategoryUseCase } from './create-category.use-case.spec';
import { DeleteCategoryUseCase } from './delete-category.use-case';
import { EditCategoryUseCase } from './edit-category.use-case';
import { FindAllCategoriesUseCase } from './find-all-categories.use-case';
import { FindCategoryByIdUseCase } from './find-category-by-id.use-case';
import { FindCategoryBySlugUseCase } from './find-category-by-slug.use-case';
import { DatabaseModule } from '@root/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateCategoryUseCase,
    DeleteCategoryUseCase,
    EditCategoryUseCase,
    FindAllCategoriesUseCase,
    FindCategoryByIdUseCase,
    FindCategoryBySlugUseCase,
  ],
  exports: [
    CreateCategoryUseCase,
    DeleteCategoryUseCase,
    EditCategoryUseCase,
    FindAllCategoriesUseCase,
    FindCategoryByIdUseCase,
    FindCategoryBySlugUseCase,
  ],
})
export class CategoryUseCasesModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from '@root/infra/database/database.module';
import { FindAllProductsUseCase } from './find-all-products.use-case';
import { RegisterProductUseCase } from './register-product.use-case';
import { FindProductBySlugUseCase } from './find-product-by-slug.use-case';
import { DeleteProductUseCase } from './delete-product.use-case';
import { UpdateProductCategoryUseCase } from './update-product-category.use-case';
import { FindProductsByCategoryUseCase } from './find-products-by-category.use-case';

@Module({
  imports: [DatabaseModule],
  providers: [
    FindAllProductsUseCase,
    FindProductBySlugUseCase,
    RegisterProductUseCase,
    FindProductBySlugUseCase,
    DeleteProductUseCase,
    FindProductsByCategoryUseCase,
    UpdateProductCategoryUseCase,
  ],
  exports: [
    FindProductBySlugUseCase,
    FindAllProductsUseCase,
    RegisterProductUseCase,
    FindProductBySlugUseCase,
    DeleteProductUseCase,
    UpdateProductCategoryUseCase,
    FindProductsByCategoryUseCase,
  ],
})
export class ProductUseCaseModule {}

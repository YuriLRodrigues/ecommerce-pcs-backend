import { Module } from '@nestjs/common';
import { DatabaseModule } from '@root/infra/database/database.module';
import { FindAllProductsUseCase } from './find-all-products.use-case';
import { RegisterProductUseCase } from './register-product.use-case';
import { FindProductBySlugUseCase } from './find-product-by-slug.use-case';
import { FindProductsByCategory } from './find-products-by-category';

@Module({
  imports: [DatabaseModule],
  providers: [
    FindAllProductsUseCase,
    FindProductBySlugUseCase,
    RegisterProductUseCase,
    FindProductBySlugUseCase,
    FindProductsByCategory,
  ],
  exports: [
    FindProductBySlugUseCase,
    FindAllProductsUseCase,
    RegisterProductUseCase,
    FindProductBySlugUseCase,
    FindProductsByCategory,
  ],
})
export class ProductUseCaseModule {}

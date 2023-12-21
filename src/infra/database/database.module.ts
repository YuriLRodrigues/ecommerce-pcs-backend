import { Module } from '@nestjs/common';
import { UserRepository } from '@root/domain/aplication/repositories/user.repository';
import { PrismaUserRepository } from './repositories/prisma-user-repository';
import { PrismaService } from './prisma.service';
import { PrismaProductRepository } from './repositories/prisma-product-repository';
import { ProductRepository } from '@root/domain/aplication/repositories/product.repository';

import { PrismaCategoryRepository } from './repositories/prisma-category-repository';
import { CategoryRepository } from '@root/domain/aplication/repositories/category.repository';

@Module({
  controllers: [],
  providers: [
    PrismaService,
    {
      useClass: PrismaUserRepository,
      provide: UserRepository,
    },
    {
      useClass: PrismaCategoryRepository,
      provide: CategoryRepository,
    },
    {
      useClass: PrismaProductRepository,
      provide: ProductRepository,
    },
  ],
  exports: [PrismaService, UserRepository, ProductRepository, CategoryRepository],
})
export class DatabaseModule {}

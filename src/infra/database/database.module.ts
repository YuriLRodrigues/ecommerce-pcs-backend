import { Module } from '@nestjs/common';
import { UserRepository } from '@root/domain/aplication/repositories/user.repository';
import { PrismaUserRepository } from './repositories/prisma-user-repository';
import { PrismaService } from './prisma.service';
import { PrismaProductRepository } from './repositories/prisma-product-repository';
import { ProductRepository } from '@root/domain/aplication/repositories/product.repository';

@Module({
  controllers: [],
  providers: [
    PrismaService,
    {
      useClass: PrismaUserRepository,
      provide: UserRepository,
    },
    {
      useClass: PrismaProductRepository,
      provide: ProductRepository,
    },
  ],
  exports: [PrismaService, UserRepository, ProductRepository],
})
export class DatabaseModule {}

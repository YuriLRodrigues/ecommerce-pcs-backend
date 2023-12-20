import { Module } from '@nestjs/common';
import { UserController } from '../controller/user-controller';
import { UserUseCasesModule } from '@root/domain/aplication/use-cases/user/user-use-cases.module';
import { ProductController } from '../controller/product.controller';
import { ProductUseCaseModule } from '@root/domain/aplication/use-cases/product/product-use-cases.module';

@Module({
  imports: [UserUseCasesModule, ProductUseCaseModule],
  controllers: [UserController, ProductController],
})
export class HttpModule {}

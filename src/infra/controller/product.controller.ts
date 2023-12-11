import { Controller, Post } from '@nestjs/common';
import { RegisterProductUseCase } from '@root/domain/aplication/use-cases/product/register-product.use-case';
import { RegisterProductDTO } from './dto/product/register-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly registerProductUseCase: RegisterProductUseCase) {}

  @Post()
  async register(data: RegisterProductDTO) {}
}

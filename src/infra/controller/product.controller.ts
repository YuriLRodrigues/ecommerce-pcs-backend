import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { RegisterProductUseCase } from '@root/domain/aplication/use-cases/product/register-product.use-case';
import { RegisterProductDTO } from './dto/product/register-product.dto';
import { FindProductBySlugUseCase } from '@root/domain/aplication/use-cases/product/find-product-by-slug.use-case';
import { FindAllProductsUseCase } from '@root/domain/aplication/use-cases/product/find-all-products.use-case';
import { Public } from '../auth/public';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FindAllProductsRS } from './dto/product/returns-to-swagger/find-all';
import { Roles } from '../auth/roles';
import { UserRoles } from '@root/domain/enterprise/entities/user.entity';
import { RegisterProductRS } from './dto/product/returns-to-swagger/register';
import { FindProductsByCategory } from '@root/domain/aplication/use-cases/product/find-products-by-category';
import { FindProductsByCategoryRS } from './dto/product/returns-to-swagger/find-by-category';
import { FindProductsBySlugRS } from './dto/product/returns-to-swagger/find-by-slug';

@ApiTags('Product')
@Controller('/products')
export class ProductController {
  constructor(
    private readonly registerProductUseCase: RegisterProductUseCase,
    private readonly findProductBySlug: FindProductBySlugUseCase,
    private readonly findProductsByCategory: FindProductsByCategory,
    private readonly findAllProducts: FindAllProductsUseCase,
  ) {}

  // Register Product - Private Route - Admin Permission - POST
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Registra/Cadastra um novo produto',
    description:
      'Essa rota é responsável por fazer o cadastro de um novo produto no sistema, onde deve ser preciso passar todas as características obrigatórias de um produto',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Product created successfully',
    type: RegisterProductRS[200],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Internal API error',
    type: RegisterProductRS[400],
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorized',
    type: RegisterProductRS[401],
  })
  @ApiNotFoundResponse({
    status: 409,
    description: 'Product with this name or slug already exists',
    type: RegisterProductRS[409],
  })
  @Roles({ roles: [UserRoles.admin] })
  @Post()
  async register(
    @Body() { description, inStock, onSale, price, totalInStock, salePrice, slug, name }: RegisterProductDTO,
  ) {
    const product = await this.registerProductUseCase.execute({
      name,
      slug,
      description,
      onSale,
      price,
      inStock,
      salePrice,
      totalInStock,
    });

    if (product.isLeft()) {
      const error = product.value;
      switch (error.message) {
        case 'Product with this name or slug already exists':
          throw new ConflictException({
            statusCode: HttpStatus.CONFLICT,
            error: error.message,
          });
        default:
          throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Internal API error',
          });
      }
    }

    return 'Product created successfully';
  }

  // Find Products By Slug - Public Route - GET
  @ApiOperation({
    summary: 'Busca por um produto de acordo com o seu slug',
    description: 'Essa rota é responsável por fazer a busca de um único produto de acordo com seu slug',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Return the product found by slug',
    type: FindProductsBySlugRS[200],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Internal API error',
    type: FindProductsBySlugRS[400],
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Product not found',
    type: FindProductsBySlugRS[404],
  })
  @Public()
  @Get('/findBySlug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    const productsBySlug = await this.findProductBySlug.execute({ slug });

    if (productsBySlug.isLeft()) {
      const error = productsBySlug.value;

      switch (error.message) {
        case 'Product not found':
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            error: error.message,
          });
        default:
          throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Internal API error',
          });
      }
    }

    return productsBySlug.value;
  }

  // Find Products By Category - Public Route - GET
  @ApiOperation({
    summary: 'Busca por todos os produtos de acordo com uma determinada categoria',
    description:
      'Essa rota é responsável por fazer a busca de todos os produtos em uma categoria registrado no sistema',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Returns the products found by category',
    type: FindProductsByCategoryRS[200],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Internal API error',
    type: FindProductsByCategoryRS[400],
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'No product was found',
    type: FindProductsByCategoryRS[404],
  })
  @Public()
  @Get('/findByCategory/:category')
  async findByCategory(@Param('category') slug: string) {
    const productsByCategory = await this.findProductsByCategory.execute({ slug });

    if (productsByCategory.isLeft()) {
      const error = productsByCategory.value;

      switch (error.message) {
        case 'Products not found in this category':
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            error: error.message,
          });
        default:
          throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Internal API error',
          });
      }
    }

    return productsByCategory.value;
  }

  // Find All Products - Public Route - GET
  @ApiOperation({
    summary: 'Busca por todos os produtos',
    description:
      'Essa rota é responsável por fazer a busca de todos os produtos no sistema, independentemente da categoria, preço, data de criação ou qualquer outra característica do produto',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Returns the products found',
    type: FindAllProductsRS[200],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Internal API error',
    type: FindAllProductsRS[400],
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'No product was found',
    type: FindAllProductsRS[404],
  })
  @Public()
  @Get('/findAll')
  async findAll(@Query('page') page = 1, @Query('limit') limit = 20) {
    page = page <= 0 ? 1 : Number(page);
    limit = limit <= 0 ? 20 : Number(limit);
    limit = limit > 100 ? 100 : Number(limit);

    const products = await this.findAllProducts.execute({
      limit,
      page,
    });

    if (products.isLeft()) {
      const error = products.value;
      switch (error.message) {
        case 'No product was found':
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            error: error.message,
          });
        default:
          throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Internal API error',
          });
      }
    }

    return products.value;
  }
}

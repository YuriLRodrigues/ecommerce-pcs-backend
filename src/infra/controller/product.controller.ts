import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
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
import { FindProductsBySlugRS } from './dto/product/returns-to-swagger/find-by-slug';
import { DeleteProductUseCase } from '@root/domain/aplication/use-cases/product/delete-product.use-case';
import { DeleteProductDTO } from './dto/product/delete-product.dto';
import { DeleteProductRS } from './dto/product/returns-to-swagger/delete';
import { UpdateProductCategoryUseCase } from '@root/domain/aplication/use-cases/product/update-product-category.use-case';
import { FindProductsByCategoryUseCase } from '@root/domain/aplication/use-cases/product/find-products-by-category.use-case';
import { a } from 'vitest/dist/suite-SvxfaIxW';
import { FindByCategoryRS } from './dto/product/returns-to-swagger/find-by-category';

@ApiTags('Product')
@Controller('/products')
export class ProductController {
  constructor(
    private readonly registerProductUseCase: RegisterProductUseCase,
    private readonly findProductBySlug: FindProductBySlugUseCase,
    private readonly findAllProducts: FindAllProductsUseCase,
    private readonly deleteProduct: DeleteProductUseCase,
    private readonly updateProductCategory: UpdateProductCategoryUseCase,
    private readonly findProductsByCategory: FindProductsByCategoryUseCase,
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
  async findAll(@Query('page') page = 1, @Query('limit') limit = 20, @Query('inStock') inStock = undefined) {
    page = page <= 0 ? 1 : Number(page);
    limit = limit <= 0 ? 20 : Number(limit);
    limit = limit > 100 ? 100 : Number(limit);

    const products = await this.findAllProducts.execute({
      limit,
      page,
      inStock,
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

  //  Find Products By Category - Public Route - GET
  @ApiOperation({
    summary: 'Busca uma categoria inteira',
    description:
      'Essa rota é responsável por fazer a busca de todos os produtos dentro daquela determinada categoria',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Returns the category with all products her',
    type: FindByCategoryRS[200],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Internal API error',
    type: FindByCategoryRS[400],
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Category or products not found',
    type: FindByCategoryRS[404],
  })
  @ApiBearerAuth()
  @Get('/findByCategory/:category')
  async findByCategory(
    @Param('category') category: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('inStock') inStock = undefined,
  ) {
    page = page <= 0 ? 1 : Number(page);
    limit = limit <= 0 ? 20 : Number(limit);
    limit = limit > 100 ? 100 : Number(limit);

    const products = await this.findProductsByCategory.execute({
      categorySlug: category,
      limit,
      page,
      inStock,
    });

    if (products.isLeft()) {
      const error = products.value;
      switch (error.message) {
        case 'Category not found':
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            error: error.message,
          });
        case 'No products found in this category':
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

  // Delete Product - Private Route - Admin Permission - DELETE
  @ApiOperation({
    summary: 'Deleta um produto',
    description:
      'Essa rota é responsável por fazer a busca de um produto pelo seu slug e depois deletar ele pelo id',
  })
  @ApiOkResponse({
    status: 202,
    description: 'Returns a message saying that the product has been deleted',
    type: DeleteProductRS[202],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Internal API error',
    type: DeleteProductRS[400],
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'No product was found',
    type: DeleteProductRS[404],
  })
  @ApiBearerAuth()
  @Roles({ roles: [UserRoles.admin] })
  @Delete()
  async delete(@Body() { productSlug }: DeleteProductDTO) {
    const productIsDeleted = await this.deleteProduct.execute({
      productSlug,
    });

    if (productIsDeleted.isLeft()) {
      const error = productIsDeleted.value;
      switch (error.message) {
        case `Product ${productSlug} not found`:
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

    return 'Product deleted successfully';
  }
}

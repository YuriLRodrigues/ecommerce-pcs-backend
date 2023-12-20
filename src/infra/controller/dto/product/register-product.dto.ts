import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class RegisterProductDTO {
  @ApiProperty({
    description: 'Nome que o produto irá receber',
    example: 'RTX 3060 Ultra - 12GB',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Slug de pesquisa do produto',
    example: 'rtx-3060-ultra-12gb',
  })
  @IsString()
  slug: string;

  @ApiProperty({
    description: 'Descrição do determinado produto',
    example:
      'Produto super raro, produção feita para apenas 5 países, totalizando 89 produções do mesmo apenas...',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Preço do produto',
    example: 100,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Preço do produto caso ele esteja em promoção - Não obrigatório',
    example: 80,
  })
  @IsNumber()
  salePrice?: number;

  @ApiProperty({
    description: 'Boolean para dizer se aquele produto está em promoção',
    example: true,
  })
  @IsBoolean()
  onSale: boolean;

  @ApiProperty({
    description: 'Situa se o produto tem em estoque ainda ou não',
    example: true,
  })
  @IsBoolean()
  inStock: boolean;

  @ApiProperty({
    description: 'Determina a quantidade de produtos em estoque',
    example: 100,
  })
  @IsNumber()
  totalInStock: number;
}

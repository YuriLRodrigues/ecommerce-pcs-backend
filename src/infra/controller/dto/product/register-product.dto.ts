import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class RegisterProductDTO {
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
    description: 'É a avaliação que o usuário faz daquele produto',
    example: 4,
  })
  @IsNumber()
  stars: number;

  @ApiProperty({
    description: 'Situa se o produto tem em estoque ainda ou não',
    example: true,
  })
  @IsBoolean()
  inStock: boolean;

  @ApiProperty({
    description: 'Determina a quantidade de produtos em estoque',
    example: true,
  })
  @IsNumber()
  totalInStock: number;
}

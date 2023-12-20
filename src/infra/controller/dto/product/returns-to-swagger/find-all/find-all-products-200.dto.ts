import { ApiProperty } from '@nestjs/swagger';

export class FindAllProducts200DTO {
  @ApiProperty({
    example: `{name: 'RTX 3080';
      slug: 'rtx-3080';
      description: 'Placa de vídeo muito forte, roda todos os jogos em 2K';
      price: 1599.89;
      salePrice?: null;
      onSale: false;
      createdAt: 14/12/2023;
      updatedAt?: null;
      inStock: true;
      totalInStock: 5;}`,
    description: 'Retorna o produto contendo todas as suas características',
  })
  product: {
    name: string;
    slug: string;
    description: string;
    price: number;
    salePrice?: number;
    onSale: boolean;
    createdAt: Date;
    updatedAt?: Date;
    inStock: boolean;
    totalInStock: number;
  };
}

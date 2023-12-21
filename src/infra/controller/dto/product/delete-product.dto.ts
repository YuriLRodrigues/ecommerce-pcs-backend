import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteProductDTO {
  @ApiProperty({
    description:
      'Deve ser inserido o slug do produto a ser deletado, para que ele seja buscado no banco e caso encontrado, deletado pelo seu id',
    example: 'xbox-one-series-s-512gb',
  })
  @IsString()
  productSlug: string;
}

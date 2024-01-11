import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateProductCategory200DTO {
  @ApiProperty({
    description: 'Retorna uma mensagem dizendo que o produto foi atualizado',
    example: 'Product category successfully updated',
  })
  @IsString()
  message: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateProduct200DTO {
  @ApiProperty({
    description: 'Retorna uma mensagem dizendo que o produto foi atualizado',
    example: 'Product successfully updated',
  })
  @IsString()
  message: string;
}

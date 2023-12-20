import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddProductFeedbackDTO {
  @ApiProperty({
    description: 'Comentário deixado pelo usuário',
    example: 'Achei o produto incrível, qualidade excelente e envio super rápido',
  })
  @IsString()
  comment: string;

  @ApiProperty({
    description: 'Id do produto a ser adicionado o comentário',
    example: '12345',
  })
  @IsString()
  productId: string;

  @ApiProperty({
    description: 'Total de estrelas que o usuário deixou para aquele produto',
    example: 5,
  })
  @IsNumber()
  stars: number;
}

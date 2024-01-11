import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UploadImage200DTO {
  @ApiProperty({
    example: 'bucket-url-image-name',
    description: 'Retorna a url da imagem retornada do bucket',
  })
  @IsString()
  url: string;

  @ApiProperty({
    example: '122dsu-2323aie',
    description: 'Id do produto caso aquela imagem esteja ligado a um produto',
  })
  @IsString()
  productId?: string;

  @ApiProperty({
    example: '122dsu-2323aie',
    description: 'Id da categoria caso aquela imagem esteja ligada a uma categoria',
  })
  @IsString()
  categoryId?: string;
}

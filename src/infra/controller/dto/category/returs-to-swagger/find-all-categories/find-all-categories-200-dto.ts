import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';

export class FindAllCategories200DTO {
  @ApiProperty({
    example: 'u12da3-23q',
    description: 'Id da categoria, sendo ele um UUID',
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: 'PCS',
    description: 'Retora o nome da categoria',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'pcs',
    description: 'Retorna o slug do produto, que é o nome do mesmo, sem caracteres especiais e espaços',
  })
  @IsString()
  slug: string;

  @ApiProperty({
    example: {
      url: 'image-name',
      id: 'u12vdu-25b',
    },
    description: 'Nome da imagem e o seu id',
  })
  @IsObject()
  image: {
    url: string;
    id: string;
  };
}

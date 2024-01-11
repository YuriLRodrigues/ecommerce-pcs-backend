import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class FindCategoryByIdOrSlug200DTO {
  @ApiProperty({
    example: 'u12da3-23q',
    description: 'Id do produto, sendo ele um UUID',
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: 'RTX 3080',
    description: 'Retora o nome do produto',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'rtx-3080',
    description: 'Retorna o slug do produto, que é o nome do mesmo, sem caracteres especiais e espaços',
  })
  @IsString()
  slug: string;

  @ApiProperty({
    example: '21/12/23',
    description: 'Data na qual aquela categoria foi criada',
  })
  @IsDate()
  createdAt: Date;
}

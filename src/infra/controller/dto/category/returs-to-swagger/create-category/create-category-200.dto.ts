import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class CreateCategory200DTO {
  @ApiProperty({
    example: 'PCS',
    description: 'Nome da categoria',
  })
  @IsString()
  name: string;
  @ApiProperty({
    example: 'pcs',
    description: 'Slug de pesquisa da categoria',
  })
  @IsString()
  slug: string;

  @ApiProperty({
    example: '01/01/2024',
    description: 'Data em que a categoria foi criada',
  })
  @IsDate()
  createdAt?: Date;
}

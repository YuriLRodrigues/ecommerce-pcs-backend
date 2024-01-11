import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCategory409DTO {
  @ApiProperty({
    example: 'Category already exists',
    description: 'Retorna o tipo do erro da determinada requisição',
  })
  @IsString()
  error: string;

  @ApiProperty({
    example: 409,
    description: 'Retorna o StatusCode/Identificador do erro',
  })
  @IsNumber()
  statusCode: number;
}

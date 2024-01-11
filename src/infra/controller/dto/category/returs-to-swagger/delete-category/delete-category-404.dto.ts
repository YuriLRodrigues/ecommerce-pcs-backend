import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class DeleteCategory404DTO {
  @ApiProperty({
    example: `This category doesn't exist`,
    description: 'Retorna o tipo do erro da determinada requisição',
  })
  @IsString()
  error: string;

  @ApiProperty({
    example: 404,
    description: 'Retorna o StatusCode/Identificador do erro',
  })
  @IsNumber()
  statusCode: number;
}

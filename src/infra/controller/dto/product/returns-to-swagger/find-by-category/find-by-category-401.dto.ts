import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class FindProductsByCategory401DTO {
  @ApiProperty({
    example: 'Unauthorized',
    description: 'Retorna a mensagem de qual foi o erro da determinada requisição',
  })
  @IsString()
  message: string;

  @ApiProperty({
    example: 401,
    description: 'Retorna o StatusCode/Identificador do erro',
  })
  @IsNumber()
  statusCode: number;
}

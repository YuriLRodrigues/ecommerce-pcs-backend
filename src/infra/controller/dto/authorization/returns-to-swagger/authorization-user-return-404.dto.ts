import { ApiProperty } from '@nestjs/swagger';

export class AuthorizationUser404Error {
  @ApiProperty({
    example: 'User not found',
    description: 'Retorna a menssagem de acordo com o erro',
  })
  message: string;

  @ApiProperty({
    example: 'Not Found',
    description: 'Retorna o tipo do erro da determinada requisição',
  })
  error: string;

  @ApiProperty({
    example: '404',
    description: 'Retorna o StatusCode/Identificador do erro',
  })
  statusCode: number;
}

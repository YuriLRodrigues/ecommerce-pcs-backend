import { ApiProperty } from '@nestjs/swagger';

export class AuthorizationUser401Error {
  @ApiProperty({
    example: 'Authroization Error',
    description: 'Retorna a menssagem de acordo com o erro',
  })
  message: string;

  @ApiProperty({
    example: 'Unauthorized',
    description: 'Retorna o tipo do erro da determinada requisição',
  })
  error: string;

  @ApiProperty({
    example: '401',
    description: 'Retorna o StatusCode/Identificador do erro',
  })
  statusCode: number;
}

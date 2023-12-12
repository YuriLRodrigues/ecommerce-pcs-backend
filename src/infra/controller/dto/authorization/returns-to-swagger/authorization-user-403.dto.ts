import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AuthorizationUser403DTO {
  @ApiProperty({
    example: 'Invalid credentials',
    description: 'Retorna o tipo do erro da determinada requisição',
  })
  @IsString()
  error: string;

  @ApiProperty({
    example: 403,
    description: 'Retorna o StatusCode/Identificador do erro',
  })
  @IsNumber()
  statusCode: number;
}

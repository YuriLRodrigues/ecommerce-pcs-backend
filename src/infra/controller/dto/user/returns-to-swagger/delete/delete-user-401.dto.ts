import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class DeleteUser401DTO {
  @ApiProperty({
    example: 'Invalid credentials',
    description: 'Retorna o tipo do erro da determinada requisição',
  })
  @IsString()
  error: string;

  @ApiProperty({
    example: 400,
    description: 'Retorna o StatusCode/Identificador do erro',
  })
  @IsNumber()
  statusCode: number;
}

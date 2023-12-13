import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindUserById200DTO {
  @ApiProperty({
    description: 'Retorna uma mensagem dizendo que o usuário foi cadastrado',
    example: 'User found successfully',
  })
  @IsString()
  message: string;
}

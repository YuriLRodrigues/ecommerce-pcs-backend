import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindUserById404DTO {
  @ApiProperty({
    description: 'Retorna uma mensagem dizendo que o usuário foi cadastrado',
    example: 'User created successfully',
  })
  @IsString()
  message: string;
}

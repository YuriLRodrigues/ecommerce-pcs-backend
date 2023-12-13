import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterUser201DTO {
  @ApiProperty({
    description: 'Retorna uma mensagem dizendo que o usuário foi cadastrado',
    example: 'User created successfully',
  })
  @IsString()
  message: string;
}

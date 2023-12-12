import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteUser202DTO {
  @ApiProperty({
    description: 'Retorna uma mensagem dizendo que o usuário foi cadastrado',
    example: 'User deleted successfully',
  })
  @IsString()
  message: string;
}

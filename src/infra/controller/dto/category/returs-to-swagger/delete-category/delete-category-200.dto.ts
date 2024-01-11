import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteCategory200DTO {
  @ApiProperty({
    description: 'Retorna uma mensagem dizendo que o usuário foi cadastrado',
    example: 'Category deleted successfully',
  })
  @IsString()
  message: string;
}

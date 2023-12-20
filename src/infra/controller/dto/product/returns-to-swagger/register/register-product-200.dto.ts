import { ApiProperty } from '@nestjs/swagger';

export class RegisterProduct200DTO {
  @ApiProperty({
    example: `Product created successfully`,
    description: 'Retorna o produto contendo todas as suas características',
  })
  message: string;
}

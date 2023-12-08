import { ApiProperty } from '@nestjs/swagger';

export class AuthorizationUser200 {
  @ApiProperty({
    description: 'Retorna o sub todas as roles/permissões do usuário',
  })
  token: string[];
}

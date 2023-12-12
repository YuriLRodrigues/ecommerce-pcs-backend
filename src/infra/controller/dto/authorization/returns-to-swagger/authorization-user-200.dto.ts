import { ApiProperty } from '@nestjs/swagger';

export class AuthorizationUser200DTO {
  @ApiProperty({
    example: `{sub: 12234, roles: ['user']}`,
    description: 'Retorna o sub todas as roles/permissões do usuário',
  })
  token: {
    sub: string;
    roles: string[];
  };
}

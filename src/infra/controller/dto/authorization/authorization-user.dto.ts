import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class AuthorizationUserDTO {
  @ApiProperty({
    description:
      'O e-mail é necessário para que possamos validar se aquele usuário existe no banco de dados do serviço',
    example: 'user@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'A senha deve ser uma senha forte, para que assim passe na validação do DTO',
    example: 'Password123#',
  })
  @IsStrongPassword()
  password: string;
}

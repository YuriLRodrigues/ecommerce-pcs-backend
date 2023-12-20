import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class RegisterUserDTO {
  @ApiProperty({
    description: 'Avatar inserido pelo usuário',
    example: 'avatar.png',
  })
  @IsString()
  avatar: string;

  @ApiProperty({
    description: 'E-mail a ser cadastrado',
    example: 'user@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Seu nome',
    example: 'Yuri',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Senha forte',
    example: 'Teste123#',
  })
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description: 'Nome de usuário',
    example: 'yuri_rod',
  })
  @IsString()
  username: string;
}

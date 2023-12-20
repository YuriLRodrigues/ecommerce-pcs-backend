import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty({
    description: 'Avatar a ser utilizado de perfil para o usuário',
    example: 'avatar.png',
  })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({
    description: 'Seu nome',
    example: 'Yuri',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Nome de usuário',
    example: 'yuri_rod',
  })
  @IsOptional()
  @IsString()
  username?: string;
}

import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindUserByIdDTO {
  @ApiProperty()
  @IsString()
  id: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSecureNoteRequestBodyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  note: string;
}

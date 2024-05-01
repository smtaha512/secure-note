import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateSecureNoteRequestParamsDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSecureNoteBodyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  note: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { SecureNote } from '../../domain/secure-note';

export class FetchSecureNoteResponseDto implements SecureNote {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  note: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { SecureNoteListItem } from '../../domain/secure-note';

export class FetchSecureNotesResponseDto implements SecureNoteListItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;
}

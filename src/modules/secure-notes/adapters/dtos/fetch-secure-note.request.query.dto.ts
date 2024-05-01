import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';
import { SecureNoteCrypticState } from '../../domain/secure-note';

export class FetchSecureNoteRequestQueryDto {
  @ApiProperty({ default: 'decrypted' })
  @IsString()
  @IsIn(['encrypted', 'decrypted'] satisfies [
    Extract<SecureNoteCrypticState, 'encrypted'>,
    Extract<SecureNoteCrypticState, 'decrypted'>,
  ])
  mode: SecureNoteCrypticState;
}

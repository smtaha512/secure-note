import { Inject, Injectable } from '@nestjs/common';
import { SecureNote } from '../../domain/secure-note';
import {
  SecureNotesRepository,
  SecureNotesRepositoryToken,
} from '../../domain/secure-notes.repository';
import { Crypto, CryptoProvider } from '../../infra/crypto/crypto';
import { FetchSecureNoteUsecase } from '../fetch-secure-note/fetch-secure-note.usecase';

@Injectable()
export class UpdateSecureNoteUsecase {
  constructor(
    @Inject(CryptoProvider) private readonly cryptoService: Crypto,
    @Inject(SecureNotesRepositoryToken)
    private readonly secureNotesRepository: SecureNotesRepository,
    private readonly fetchSecureNoteUsecase: FetchSecureNoteUsecase,
  ) {}

  async execute(note: Pick<SecureNote, 'id' | 'note'>): Promise<void> {
    const existingNote = await this.fetchSecureNoteUsecase.execute(
      note.id,
      'encrypted',
    );

    const key = this.getEncryptionKey();
    const encryptedNote = this.cryptoService.encrypt(note.note, key);

    await this.secureNotesRepository.update(existingNote.id, encryptedNote);
  }

  private getEncryptionKey() {
    return Buffer.from(
      'ddabcdb1df2012d8a95c61c009832607175c191770cb4e53954b0e97f36dcebd',
      'hex',
    );
  }
}

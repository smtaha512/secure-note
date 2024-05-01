import { Inject, Injectable } from '@nestjs/common';
import { SecureNote, SecureNoteCrypticState } from '../../domain/secure-note';
import {
  SecureNotesRepository,
  SecureNotesRepositoryToken,
} from '../../domain/secure-notes.repository';
import { Crypto, CryptoProvider } from '../../infra/crypto/crypto';
import { SecureNoteNotFoundError } from '../../infra/errors/secure-note-not-found.error';
import { CannotFindSecureNoteByCriteriaException } from '../exceptions/cannot-find-secure-note-by-criteria.exception';

@Injectable()
export class FetchSecureNoteUsecase {
  constructor(
    @Inject(SecureNotesRepositoryToken)
    private readonly secureNotesRepository: SecureNotesRepository,
    @Inject(CryptoProvider) private readonly cryptoService: Crypto,
  ) {}

  async execute(id: string, mode: SecureNoteCrypticState): Promise<SecureNote> {
    try {
      const note = await this.secureNotesRepository.findById(id);

      if (mode === 'encrypted') {
        return note;
      }

      const decryptedNoteText = this.cryptoService.decrypt(
        note.note,
        this.getEncryptionKey(),
      );

      return { ...note, note: decryptedNoteText };
    } catch (error) {
      if (error instanceof SecureNoteNotFoundError) {
        throw new CannotFindSecureNoteByCriteriaException({ id });
      }

      throw error;
    }
  }

  private getEncryptionKey() {
    return Buffer.from(
      'ddabcdb1df2012d8a95c61c009832607175c191770cb4e53954b0e97f36dcebd',
      'hex',
    );
  }
}

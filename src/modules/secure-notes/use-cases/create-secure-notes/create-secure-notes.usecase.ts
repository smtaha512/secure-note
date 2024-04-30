import { Inject, Injectable } from '@nestjs/common';
import { SecureNote } from '../../domain/secure-note';
import {
  SecureNotesRepository,
  SecureNotesRepositoryToken,
} from '../../domain/secure-notes.repository';
import { Crypto, CryptoProvider } from '../../infra/crypto/crypto';

@Injectable()
export class CreateSecureNotesUsecase {
  constructor(
    @Inject(SecureNotesRepositoryToken)
    private readonly secureNotesRepository: SecureNotesRepository,
    @Inject(CryptoProvider) private readonly cryptoService: Crypto,
  ) {}

  async execute(note: Pick<SecureNote, 'note'>): Promise<void> {
    const key = this.getEncryptionKey();
    const encryptedNote = this.cryptoService.encrypt(note.note, key);

    await this.secureNotesRepository.create({ note: encryptedNote });
  }

  private getEncryptionKey() {
    return Buffer.from(
      'ddabcdb1df2012d8a95c61c009832607175c191770cb4e53954b0e97f36dcebd',
      'hex',
    );
  }
}

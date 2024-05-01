import { Inject, Injectable } from '@nestjs/common';
import {
  SecureNotesRepository,
  SecureNotesRepositoryToken,
} from '../../domain/secure-notes.repository';

@Injectable()
export class DeleteSecureNoteUsecase {
  constructor(
    @Inject(SecureNotesRepositoryToken)
    private readonly secureNotesRepository: SecureNotesRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.secureNotesRepository.delete(id);
  }
}

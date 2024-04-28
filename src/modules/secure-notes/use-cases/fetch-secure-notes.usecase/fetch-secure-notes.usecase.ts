import { Inject, Injectable } from '@nestjs/common';
import {
  SecureNotesRepository,
  SecureNotesRepositoryToken,
} from '../../domain/secure-notes.repository';

@Injectable()
export class FetchSecureNotesUsecase {
  constructor(
    @Inject(SecureNotesRepositoryToken)
    private readonly secureNotesRepository: SecureNotesRepository,
  ) {}

  execute() {
    return this.secureNotesRepository.findAll();
  }
}

import { SecureNotesList } from './secure-note';

export const SecureNotesRepositoryToken = 'SECURE_NOTES_REPOSITORY';

export interface SecureNotesRepository {
  findAll(): Promise<SecureNotesList>;
}

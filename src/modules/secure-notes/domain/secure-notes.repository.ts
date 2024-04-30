import { SecureNote, SecureNotesList } from './secure-note';

export const SecureNotesRepositoryToken = 'SECURE_NOTES_REPOSITORY';

export interface SecureNotesRepository {
  create(note: Pick<SecureNote, 'note'>): Promise<1>;
  findAll(): Promise<SecureNotesList>;
}

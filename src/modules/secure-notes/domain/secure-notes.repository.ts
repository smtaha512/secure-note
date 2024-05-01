import { SecureNote, SecureNotesList } from './secure-note';

export const SecureNotesRepositoryToken = 'SECURE_NOTES_REPOSITORY';

export interface SecureNotesRepository {
  create(note: Pick<SecureNote, 'note'>): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<SecureNotesList>;
  findById(id: string): Promise<SecureNote>;
}

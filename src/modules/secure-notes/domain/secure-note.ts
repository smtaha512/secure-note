export interface SecureNote {
  id: string;
  note: string;
  createdAt: Date;
}

export type SecureNoteListItem = Pick<SecureNote, 'id' | 'createdAt'>;

export type SecureNotesList = Array<SecureNoteListItem>;

export type SecureNoteCrypticState = 'encrypted' | 'decrypted';

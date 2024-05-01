export class SecureNoteNotFoundError extends Error {
  constructor(criteria: { id: string }) {
    super(`Cannot find secure note by: ${JSON.stringify(criteria)}`);
  }
}

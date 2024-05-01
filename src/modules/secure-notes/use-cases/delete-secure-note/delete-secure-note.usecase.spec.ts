import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { v4 as uuidV4 } from 'uuid';
import { SecureNotesRepository } from '../../domain/secure-notes.repository';
import { DeleteSecureNoteUsecase } from './delete-secure-note.usecase';

describe('DeleteSecureNoteUsecase', () => {
  let deleteSecureNoteUsecase: DeleteSecureNoteUsecase;
  let secureNotesRepository: DeepMocked<SecureNotesRepository>;

  beforeEach(() => {
    secureNotesRepository = createMock();
    deleteSecureNoteUsecase = new DeleteSecureNoteUsecase(
      secureNotesRepository,
    );
  });

  it('should be defined', () => {
    expect(deleteSecureNoteUsecase).toBeDefined();
  });

  it('should pass correct params to the repository', async () => {
    const id = uuidV4();

    await deleteSecureNoteUsecase.execute(id);

    expect(secureNotesRepository.delete).toHaveBeenCalledWith(id);
  });

  it('should return `undefined` if the note is deleted', async () => {
    const id = uuidV4();

    expect(deleteSecureNoteUsecase.execute(id)).resolves.toBeUndefined();
  });
});

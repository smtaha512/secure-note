import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { v4 as uuidV4 } from 'uuid';
import { SecureNotesRepository } from '../../domain/secure-notes.repository';
import { Crypto } from '../../infra/crypto/crypto';
import { SecureNoteTypeormEntity } from '../../infra/secure-note.typeorm.entity';
import { CannotFindSecureNoteByCriteriaException } from '../exceptions/cannot-find-secure-note-by-criteria.exception';
import { FetchSecureNoteUsecase } from '../fetch-secure-note/fetch-secure-note.usecase';
import { UpdateSecureNoteUsecase } from './update-secure-note.usecase';

describe('UpdateSecureNoteUsecase', () => {
  let updateSecureNoteUsecase: UpdateSecureNoteUsecase;
  let secureNotesRepository: DeepMocked<SecureNotesRepository>;
  let cryptoService: DeepMocked<Crypto>;
  let fetchSecureNoteUsecase: DeepMocked<FetchSecureNoteUsecase>;

  beforeEach(() => {
    secureNotesRepository = createMock();
    cryptoService = createMock();
    fetchSecureNoteUsecase = createMock();

    updateSecureNoteUsecase = new UpdateSecureNoteUsecase(
      cryptoService,
      secureNotesRepository,
      fetchSecureNoteUsecase,
    );
  });

  it('should be defined', () => {
    expect(updateSecureNoteUsecase).toBeDefined();
  });

  describe('success scenarios', () => {
    const id = uuidV4();
    const note = 'note';

    it('should pass correct params to repository', async () => {
      const encryptedNote = 'encrypted-note';

      const existingNote = new SecureNoteTypeormEntity();
      existingNote.id = id;

      fetchSecureNoteUsecase.execute.mockResolvedValue(existingNote);

      cryptoService.encrypt.mockReturnValue(encryptedNote);

      await updateSecureNoteUsecase.execute({ id, note });

      expect(secureNotesRepository.update).toHaveBeenCalledTimes(1);

      expect(secureNotesRepository.update).toHaveBeenCalledWith(
        id,
        encryptedNote,
      );
    });

    it('should return undefined after updating the note', async () => {
      const encryptedNote = 'encrypted-note';

      const existingNote = new SecureNoteTypeormEntity();
      existingNote.id = id;

      fetchSecureNoteUsecase.execute.mockResolvedValue(existingNote);

      cryptoService.encrypt.mockReturnValue(encryptedNote);

      secureNotesRepository.update.mockResolvedValue(undefined);

      expect(
        updateSecureNoteUsecase.execute({ id, note }),
      ).resolves.toBeUndefined();
    });
  });

  describe('exception scenarios', () => {
    const id = uuidV4();
    it(`should throw exception if secure note is not found`, async () => {
      const exception = new CannotFindSecureNoteByCriteriaException({ id });

      fetchSecureNoteUsecase.execute.mockRejectedValue(exception);

      expect(
        updateSecureNoteUsecase.execute({ id, note: 'note' }),
      ).rejects.toThrow(exception);
    });
  });
});

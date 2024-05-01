import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { v4 as uuidV4 } from 'uuid';
import { Crypto } from '../../infra/crypto/crypto';
import { SecureNoteNotFoundError } from '../../infra/errors/secure-note-not-found.error';
import { SecureNoteTypeormEntity } from '../../infra/secure-note.typeorm.entity';
import { SecureNotesTypeormRepository } from '../../infra/secure-notes.typeorm.repository';
import { CannotFindSecureNoteByCriteriaException } from '../exceptions/cannot-find-secure-note-by-criteria.exception';
import { FetchSecureNoteUsecase } from './fetch-secure-note.usecase';

describe('FetchSecureNoteUsecase', () => {
  let fetchSecureNoteUsecase: FetchSecureNoteUsecase;
  let secureNotesRepository: DeepMocked<SecureNotesTypeormRepository>;
  let cryptoService: DeepMocked<Crypto>;

  beforeEach(() => {
    secureNotesRepository = createMock();
    cryptoService = createMock();
    fetchSecureNoteUsecase = new FetchSecureNoteUsecase(
      secureNotesRepository,
      cryptoService,
    );
  });

  it('should be defined', () => {
    expect(fetchSecureNoteUsecase).toBeDefined();
  });

  describe('success scenarios', () => {
    const id = uuidV4();
    const secureNote = new SecureNoteTypeormEntity();

    beforeEach(() => {
      secureNote.createdAt = new Date();
      secureNote.updatedAt = new Date();
      secureNote.id = id;
      secureNote.note =
        '28bf1ae0eb72f5c18cd043a6189d3d97:c021ab70fcc1c38f06df348288fabdc5';

      secureNotesRepository.findById.mockResolvedValue(secureNote);
    });

    it('should resolves to an object containing encrypted note', async () => {
      expect(
        fetchSecureNoteUsecase.execute(id, 'decrypted'),
      ).resolves.toStrictEqual({
        ...secureNote,
      });
    });

    it('should resolves to an object containing decrypted note', async () => {
      cryptoService.decrypt.mockReturnValue('string');

      expect(
        fetchSecureNoteUsecase.execute(id, 'decrypted'),
      ).resolves.toStrictEqual({ ...secureNote, note: 'string' });
    });
  });

  describe('exception scenarios', () => {
    it(`should throw a ${CannotFindSecureNoteByCriteriaException.name} exception if secure note is not found`, async () => {
      const id = uuidV4();

      secureNotesRepository.findById.mockRejectedValue(
        new SecureNoteNotFoundError({ id }),
      );

      expect(fetchSecureNoteUsecase.execute(id, 'decrypted')).rejects.toThrow(
        new CannotFindSecureNoteByCriteriaException({ id }),
      );

      expect(fetchSecureNoteUsecase.execute(id, 'encrypted')).rejects.toThrow(
        new CannotFindSecureNoteByCriteriaException({ id }),
      );
    });
  });
});

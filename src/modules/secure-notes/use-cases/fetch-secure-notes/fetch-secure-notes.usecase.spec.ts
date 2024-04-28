import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { v4 as uuidV4 } from 'uuid';
import { SecureNotesList } from '../../domain/secure-note';
import { SecureNotesRepository } from '../../domain/secure-notes.repository';
import { FetchSecureNotesUsecase } from './fetch-secure-notes.usecase';

describe('FetchSecureNotesUsecase', () => {
  let fetchSecureNotesUsecase: FetchSecureNotesUsecase;
  let secureNotesRepository: DeepMocked<SecureNotesRepository>;

  beforeEach(() => {
    secureNotesRepository = createMock();
    fetchSecureNotesUsecase = new FetchSecureNotesUsecase(
      secureNotesRepository,
    );
  });

  it('should be defined', () => {
    expect(fetchSecureNotesUsecase).toBeDefined();
  });

  describe('execute()', () => {
    it('should only return `id` and `createdAt` for all the items', async () => {
      const list: SecureNotesList = [{ createdAt: new Date(), id: uuidV4() }];

      secureNotesRepository.findAll.mockResolvedValue(list);

      expect(fetchSecureNotesUsecase.execute()).resolves.toEqual(list);
    });

    it('should empty array if secure notes are not available', () => {
      secureNotesRepository.findAll.mockResolvedValue([]);

      expect(fetchSecureNotesUsecase.execute()).resolves.toStrictEqual([]);
    });
  });
});

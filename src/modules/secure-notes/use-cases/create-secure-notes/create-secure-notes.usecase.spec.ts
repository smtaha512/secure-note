import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { SecureNotesRepository } from '../../domain/secure-notes.repository';
import { Crypto } from '../../infra/crypto/crypto';
import { CreateSecureNotesUsecase } from './create-secure-notes.usecase';

describe('CreateSecureNotesUsecase', () => {
  let createSecureNotesUsecase: CreateSecureNotesUsecase;
  let secureNotesRepository: DeepMocked<SecureNotesRepository>;
  let cryptoService: DeepMocked<Crypto>;

  beforeEach(() => {
    secureNotesRepository = createMock();
    cryptoService = createMock();
    createSecureNotesUsecase = new CreateSecureNotesUsecase(
      secureNotesRepository,
      cryptoService,
    );
  });

  it('should be defined', () => {
    expect(createSecureNotesUsecase).toBeDefined();
  });

  describe('execute()', () => {
    const plainTextNote = 'note-to-save';
    const encryptedNote = 'encrypted-not-to-save';

    it('should return undefined if note is created successfully', async () => {
      cryptoService.encrypt.mockReturnValue(encryptedNote);

      expect(
        createSecureNotesUsecase.execute({ note: plainTextNote }),
      ).resolves.toEqual(undefined);
    });

    it('should send correct params to repository', async () => {
      cryptoService.encrypt.mockReturnValue(encryptedNote);

      await createSecureNotesUsecase.execute({ note: plainTextNote });

      expect(secureNotesRepository.create).toHaveBeenCalledTimes(1);

      expect(secureNotesRepository.create).toHaveBeenCalledWith({
        note: encryptedNote,
      });
    });
  });
});

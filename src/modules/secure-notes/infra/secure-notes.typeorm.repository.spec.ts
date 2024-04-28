import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Repository } from 'typeorm';
import { SecureNotesList } from '../domain/secure-note';
import { SecureNoteTypeormEntity } from './secure-note.typeorm.entity';
import { SecureNotesTypeormRepository } from './secure-notes.typeorm.repository';

describe('SecureNoteTypeormRepository', () => {
  let secureNotesTypeormRepository: SecureNotesTypeormRepository;
  let nativeRepository: DeepMocked<Repository<SecureNoteTypeormEntity>>;

  beforeEach(() => {
    nativeRepository = createMock();
    secureNotesTypeormRepository = new SecureNotesTypeormRepository(
      nativeRepository,
    );
  });

  it('should be defined', () => {
    expect(secureNotesTypeormRepository).toBeDefined();
  });

  describe('findAll()', () => {
    it('should only return `id` and `createdAt` for all the items', async () => {
      const entity = new SecureNoteTypeormEntity();
      entity.createdAt = new Date();
      entity.id = 'uuid';
      const list: SecureNoteTypeormEntity[] = [entity];

      nativeRepository.find.mockResolvedValue(list);

      const expectedResponse: SecureNotesList = [
        { createdAt: entity.createdAt, id: entity.id },
      ];

      expect(secureNotesTypeormRepository.findAll()).resolves.toEqual(
        expectedResponse,
      );
    });

    it('should empty array if secure notes are not available', () => {
      nativeRepository.find.mockResolvedValue([]);

      expect(secureNotesTypeormRepository.findAll()).resolves.toStrictEqual([]);
    });
  });
});

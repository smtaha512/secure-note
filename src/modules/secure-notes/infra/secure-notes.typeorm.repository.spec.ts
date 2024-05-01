import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { EntityNotFoundError, Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { SecureNotesList } from '../domain/secure-note';
import { SecureNoteNotFoundError } from './errors/secure-note-not-found.error';
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

  describe('create()', () => {
    it('should pass correct params to the repository', async () => {
      const note = 'note-to-save';

      secureNotesTypeormRepository.create({ note });

      expect(nativeRepository.save).toHaveBeenCalledTimes(1);

      expect(nativeRepository.save).toHaveBeenCalledWith({ note });
    });
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

  describe('findById()', () => {
    const id = uuidV4();
    describe('success scenarios', () => {
      it('should return secure note entity by id', async () => {
        const secureNote = new SecureNoteTypeormEntity();
        secureNote.createdAt = new Date();
        secureNote.updatedAt = new Date();
        secureNote.id = id;
        secureNote.note =
          '28bf1ae0eb72f5c18cd043a6189d3d97:c021ab70fcc1c38f06df348288fabdc5';

        nativeRepository.findOneByOrFail.mockResolvedValue(secureNote);

        expect(secureNotesTypeormRepository.findById(id)).resolves.toEqual(
          secureNote,
        );
      });
    });

    describe('error scenarios', () => {
      it(`it should throw ${SecureNoteNotFoundError.name} if secure note is not found`, async () => {
        nativeRepository.findOneByOrFail.mockRejectedValue(
          new EntityNotFoundError(SecureNoteTypeormEntity, { id }),
        );

        await expect(secureNotesTypeormRepository.findById(id)).rejects.toEqual(
          new SecureNoteNotFoundError({ id }),
        );
      });
    });
  });
});

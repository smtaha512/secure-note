import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidV4 } from 'uuid';
import { SecureNoteTypeormEntity } from '../infra/secure-note.typeorm.entity';
import { CreateSecureNotesUsecase } from '../use-cases/create-secure-notes/create-secure-notes.usecase';
import { FetchSecureNoteUsecase } from '../use-cases/fetch-secure-note/fetch-secure-note.usecase';
import { FetchSecureNotesUsecase } from '../use-cases/fetch-secure-notes/fetch-secure-notes.usecase';
import { CreateSecureNoteBodyDto } from './dtos/create-secure-note.body.dto';
import { FetchSecureNotesResponseDto } from './dtos/fetch-secure-notes.response.dto';
import { SecureNotesController } from './secure-notes.controller';

describe('SecureNotesController', () => {
  let controller: SecureNotesController;
  let createSecureNotesUsecase: jest.Mocked<CreateSecureNotesUsecase>;
  let fetchSecureNotesUsecase: jest.Mocked<FetchSecureNotesUsecase>;
  let fetchSecureNoteUsecase: jest.Mocked<FetchSecureNoteUsecase>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecureNotesController],
      providers: [
        { provide: CreateSecureNotesUsecase, useValue: { execute: jest.fn() } },
        { provide: FetchSecureNotesUsecase, useValue: { execute: jest.fn() } },
        { provide: FetchSecureNoteUsecase, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    controller = module.get<SecureNotesController>(SecureNotesController);
    createSecureNotesUsecase = module.get(CreateSecureNotesUsecase);
    fetchSecureNotesUsecase = module.get(FetchSecureNotesUsecase);
    fetchSecureNoteUsecase = module.get(FetchSecureNoteUsecase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createSecureNotes()', () => {
    it('should pass correct params to the usecase', async () => {
      const incomingNote: CreateSecureNoteBodyDto = { note: 'note' };

      createSecureNotesUsecase.execute.mockResolvedValue(undefined);

      await controller.createSecureNote(incomingNote);

      expect(createSecureNotesUsecase.execute).toHaveBeenCalledTimes(1);

      expect(createSecureNotesUsecase.execute).toHaveBeenCalledWith(
        incomingNote,
      );
    });

    it('should return `undefined` if secure note is saved successfully', () => {
      const incomingNote: CreateSecureNoteBodyDto = { note: 'note' };

      createSecureNotesUsecase.execute.mockResolvedValue(undefined);

      expect(controller.createSecureNote(incomingNote)).resolves.toStrictEqual(
        undefined,
      );
    });
  });

  describe('fetchSecureNotes()', () => {
    it('should return list of secure notes', () => {
      const list: FetchSecureNotesResponseDto[] = [
        { createdAt: new Date(), id: uuidV4() },
      ];

      fetchSecureNotesUsecase.execute.mockResolvedValue(list);

      expect(controller.fetchSecureNotes()).resolves.toStrictEqual(list);
    });

    it('should empty array if secure notes are not available', () => {
      fetchSecureNotesUsecase.execute.mockResolvedValue([]);

      expect(controller.fetchSecureNotes()).resolves.toStrictEqual([]);
    });
  });

  describe('fetchSecureNote()', () => {
    const id = uuidV4();
    describe('success scenarios', () => {
      const secureNote = new SecureNoteTypeormEntity();

      beforeEach(() => {
        secureNote.createdAt = new Date();
        secureNote.updatedAt = new Date();
        secureNote.id = id;
      });

      it('should return an encrypted secure note', async () => {
        secureNote.note =
          '28bf1ae0eb72f5c18cd043a6189d3d97:c021ab70fcc1c38f06df348288fabdc5';

        fetchSecureNoteUsecase.execute.mockResolvedValue(secureNote);

        expect(
          controller.fetchSecureNote({ id }, { mode: 'encrypted' }),
        ).resolves.toEqual(secureNote);
      });

      it('should return an decrypted secure note', async () => {
        secureNote.note = 'string';

        fetchSecureNoteUsecase.execute.mockResolvedValue(secureNote);

        expect(
          controller.fetchSecureNote({ id }, { mode: 'encrypted' }),
        ).resolves.toEqual(secureNote);
      });
    });
  });
});

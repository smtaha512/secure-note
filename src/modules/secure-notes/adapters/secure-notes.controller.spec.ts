import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidV4 } from 'uuid';
import { FetchSecureNotesUsecase } from '../use-cases/fetch-secure-notes.usecase/fetch-secure-notes.usecase';
import { FetchSecureNotesResponseDto } from './dtos/fetch-secure-notes.response.dto';
import { SecureNotesController } from './secure-notes.controller';

describe('SecureNoteController', () => {
  let controller: SecureNotesController;
  let fetchSecureNotesUser: jest.Mocked<FetchSecureNotesUsecase>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecureNotesController],
      providers: [
        { provide: FetchSecureNotesUsecase, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    controller = module.get<SecureNotesController>(SecureNotesController);
    fetchSecureNotesUser = module.get(FetchSecureNotesUsecase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('fetchSecureNotes()', () => {
    it('should return list of secure notes', () => {
      const list: FetchSecureNotesResponseDto[] = [
        { createdAt: new Date(), id: uuidV4() },
      ];

      fetchSecureNotesUser.execute.mockResolvedValue(list);

      expect(controller.fetchSecureNotes()).resolves.toStrictEqual(list);
    });

    it('should empty array if secure notes are not available', () => {
      fetchSecureNotesUser.execute.mockResolvedValue([]);

      expect(controller.fetchSecureNotes()).resolves.toStrictEqual([]);
    });
  });
});

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecureNotesController } from './adapters/secure-notes.controller';
import { SecureNotesRepositoryToken } from './domain/secure-notes.repository';
import { SecureNoteTypeormEntity } from './infra/secure-note.typeorm.entity';
import { SecureNotesTypeormRepository } from './infra/secure-notes.typeorm.repository';
import { FetchSecureNotesUsecase } from './use-cases/fetch-secure-notes.usecase/fetch-secure-notes.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([SecureNoteTypeormEntity])],
  providers: [
    {
      provide: SecureNotesRepositoryToken,
      useClass: SecureNotesTypeormRepository,
    },
    FetchSecureNotesUsecase,
  ],
  controllers: [SecureNotesController],
})
export class SecureNotesModule {}

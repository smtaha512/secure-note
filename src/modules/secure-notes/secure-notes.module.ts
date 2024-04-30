import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecureNotesController } from './adapters/secure-notes.controller';
import { SecureNotesRepositoryToken } from './domain/secure-notes.repository';
import { CryptoProvider } from './infra/crypto/crypto';
import { CryptoService } from './infra/crypto/crypto.service';
import { SecureNoteTypeormEntity } from './infra/secure-note.typeorm.entity';
import { SecureNotesTypeormRepository } from './infra/secure-notes.typeorm.repository';
import { CreateSecureNotesUsecase } from './use-cases/create-secure-notes/create-secure-notes.usecase';
import { FetchSecureNotesUsecase } from './use-cases/fetch-secure-notes/fetch-secure-notes.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([SecureNoteTypeormEntity])],
  providers: [
    {
      provide: SecureNotesRepositoryToken,
      useClass: SecureNotesTypeormRepository,
    },

    { provide: CryptoProvider, useClass: CryptoService },

    CreateSecureNotesUsecase,
    FetchSecureNotesUsecase,
  ],
  controllers: [SecureNotesController],
})
export class SecureNotesModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { SecureNote } from '../domain/secure-note';
import { SecureNotesRepository } from '../domain/secure-notes.repository';
import { SecureNoteNotFoundError } from './errors/secure-note-not-found.error';
import { SecureNoteTypeormEntity } from './secure-note.typeorm.entity';

@Injectable()
export class SecureNotesTypeormRepository implements SecureNotesRepository {
  constructor(
    @InjectRepository(SecureNoteTypeormEntity)
    private readonly repository: Repository<SecureNoteTypeormEntity>,
  ) {}

  async create(note: Pick<SecureNote, 'note'>): Promise<void> {
    await this.repository.save(note);
  }

  async findAll(): Promise<Pick<SecureNote, 'id' | 'createdAt'>[]> {
    return this.repository.find({ select: ['createdAt', 'id'] });
  }

  async findById(id: string): Promise<SecureNote> {
    try {
      return await this.repository.findOneByOrFail({ id });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new SecureNoteNotFoundError({ id });
      }

      throw error;
    }
  }
}

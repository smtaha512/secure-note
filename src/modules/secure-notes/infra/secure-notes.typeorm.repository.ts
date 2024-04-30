import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SecureNote } from '../domain/secure-note';
import { SecureNotesRepository } from '../domain/secure-notes.repository';
import { SecureNoteTypeormEntity } from './secure-note.typeorm.entity';

@Injectable()
export class SecureNotesTypeormRepository implements SecureNotesRepository {
  constructor(
    @InjectRepository(SecureNoteTypeormEntity)
    private readonly repository: Repository<SecureNoteTypeormEntity>,
  ) {}

  async create(note: Pick<SecureNote, 'note'>): Promise<1> {
    await this.repository.save(note);
    return 1;
  }

  async findAll(): Promise<Pick<SecureNote, 'id' | 'createdAt'>[]> {
    return this.repository.find({ select: ['createdAt', 'id'] });
  }
}

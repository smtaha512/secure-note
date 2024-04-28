import { Column, Entity } from 'typeorm';
import { BaseTypeOrmEntity } from '../../../shared/infra/base.typeorm.entity';
import { SecureNote } from '../domain/secure-note';

@Entity('secure_note')
export class SecureNoteTypeormEntity
  extends BaseTypeOrmEntity
  implements SecureNote
{
  @Column({ nullable: false }) note: string;
}

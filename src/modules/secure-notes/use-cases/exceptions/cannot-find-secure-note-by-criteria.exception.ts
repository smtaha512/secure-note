import { NotFoundException } from '@nestjs/common';

export class CannotFindSecureNoteByCriteriaException extends NotFoundException {
  constructor(criteria: { id: string }) {
    super(`Cannot find secure note by: ${JSON.stringify(criteria)}`);
  }
}

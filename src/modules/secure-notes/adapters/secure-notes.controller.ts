import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SecureNotesList } from '../domain/secure-note';
import { FetchSecureNotesUsecase } from '../use-cases/fetch-secure-notes.usecase/fetch-secure-notes.usecase';
import { FetchSecureNotesResponseDto } from './dtos/fetch-secure-notes.response.dto';

@ApiTags('Secure notes')
@Controller('secure-notes')
export class SecureNotesController {
  constructor(
    private readonly fetchSecureNotesUsecase: FetchSecureNotesUsecase,
  ) {}

  @Get('/')
  @ApiOperation({ summary: 'Return a list of secure notes' })
  @ApiOkResponse({
    description: 'List of secure notes',
    type: FetchSecureNotesResponseDto,
  })
  async fetchSecureNotes(): Promise<SecureNotesList> {
    return this.fetchSecureNotesUsecase.execute();
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SecureNotesList } from '../domain/secure-note';
import { CreateSecureNotesUsecase } from '../use-cases/create-secure-notes/create-secure-notes.usecase';
import { FetchSecureNotesUsecase } from '../use-cases/fetch-secure-notes/fetch-secure-notes.usecase';
import { CreateSecureNoteBodyDto } from './dtos/create-secure-note.body.dto';
import { FetchSecureNotesResponseDto } from './dtos/fetch-secure-notes.response.dto';

@ApiTags('Secure notes')
@Controller('secure-notes')
export class SecureNotesController {
  constructor(
    private readonly fetchSecureNotesUsecase: FetchSecureNotesUsecase,
    private readonly createSecureNoteUsecase: CreateSecureNotesUsecase,
  ) {}

  @Post('/')
  @ApiOperation({ summary: 'Store a secure note' })
  @ApiCreatedResponse({ description: 'Secure note stored', type: undefined })
  async createSecureNote(@Body() body: CreateSecureNoteBodyDto): Promise<void> {
    return this.createSecureNoteUsecase.execute(body);
  }

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

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SecureNotesList } from '../domain/secure-note';
import { CreateSecureNotesUsecase } from '../use-cases/create-secure-notes/create-secure-notes.usecase';
import { FetchSecureNoteUsecase } from '../use-cases/fetch-secure-note/fetch-secure-note.usecase';
import { FetchSecureNotesUsecase } from '../use-cases/fetch-secure-notes/fetch-secure-notes.usecase';
import { CreateSecureNoteBodyDto } from './dtos/create-secure-note.body.dto';
import { FetchSecureNoteRequestParamsDto } from './dtos/fetch-secure-note.request.params.dto';
import { FetchSecureNoteRequestQueryDto } from './dtos/fetch-secure-note.request.query.dto';
import { FetchSecureNoteResponseDto } from './dtos/fetch-secure-note.response.dto';
import { FetchSecureNotesResponseDto } from './dtos/fetch-secure-notes.response.dto';

@ApiTags('Secure notes')
@Controller('secure-notes')
export class SecureNotesController {
  constructor(
    private readonly createSecureNoteUsecase: CreateSecureNotesUsecase,
    private readonly fetchSecureNoteUsecase: FetchSecureNoteUsecase,
    private readonly fetchSecureNotesUsecase: FetchSecureNotesUsecase,
  ) {}

  @Post('/')
  @ApiOperation({ summary: 'Store a secure note' })
  @ApiCreatedResponse({ description: 'Secure note stored', type: undefined })
  async createSecureNote(@Body() body: CreateSecureNoteBodyDto): Promise<void> {
    return this.createSecureNoteUsecase.execute(body);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Return a secure note' })
  @ApiOkResponse({
    description: 'Fetched secure note by id',
    type: FetchSecureNoteResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Can not find secure note by id' })
  async fetchSecureNote(
    @Param() params: FetchSecureNoteRequestParamsDto,
    @Query() query: FetchSecureNoteRequestQueryDto,
  ): Promise<FetchSecureNoteResponseDto> {
    return await this.fetchSecureNoteUsecase.execute(params.id, query.mode);
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

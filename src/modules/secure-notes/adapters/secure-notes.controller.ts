import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SecureNotesList } from '../domain/secure-note';
import { CreateSecureNotesUsecase } from '../use-cases/create-secure-notes/create-secure-notes.usecase';
import { DeleteSecureNoteUsecase } from '../use-cases/delete-secure-note/delete-secure-note.usecase';
import { FetchSecureNoteUsecase } from '../use-cases/fetch-secure-note/fetch-secure-note.usecase';
import { FetchSecureNotesUsecase } from '../use-cases/fetch-secure-notes/fetch-secure-notes.usecase';
import { UpdateSecureNoteUsecase } from '../use-cases/update-secure-note/update-secure-note.usecase';
import { CreateSecureNoteBodyDto } from './dtos/create-secure-note.body.dto';
import { FetchSecureNoteRequestParamsDto } from './dtos/fetch-secure-note.request.params.dto';
import { FetchSecureNoteRequestQueryDto } from './dtos/fetch-secure-note.request.query.dto';
import { FetchSecureNoteResponseDto } from './dtos/fetch-secure-note.response.dto';
import { FetchSecureNotesResponseDto } from './dtos/fetch-secure-notes.response.dto';
import { UpdateSecureNoteRequestBodyDto } from './dtos/update-secure-note.request.body.dto';
import { UpdateSecureNoteRequestParamsDto } from './dtos/update-secure-note.request.params.dto';

@ApiTags('Secure notes')
@Controller('secure-notes')
export class SecureNotesController {
  constructor(
    private readonly createSecureNoteUsecase: CreateSecureNotesUsecase,
    private readonly deleteSecureNoteUsecase: DeleteSecureNoteUsecase,
    private readonly fetchSecureNoteUsecase: FetchSecureNoteUsecase,
    private readonly fetchSecureNotesUsecase: FetchSecureNotesUsecase,
    private readonly updateSecureNoteUsecase: UpdateSecureNoteUsecase,
  ) {}

  @Post('/')
  @ApiOperation({ summary: 'Store a secure note' })
  @ApiCreatedResponse({ description: 'Secure note stored', type: undefined })
  async createSecureNote(@Body() body: CreateSecureNoteBodyDto): Promise<void> {
    return this.createSecureNoteUsecase.execute(body);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a secure note' })
  @ApiOkResponse({ description: 'Secure note deleted' })
  deleteSecureNote(@Param() param: FetchSecureNoteRequestParamsDto) {
    return this.deleteSecureNoteUsecase.execute(param.id);
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

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a note' })
  @ApiOkResponse({ description: 'Secure note updated' })
  @ApiNotFoundResponse({ description: 'Can not find secure note by id' })
  async updateSecureNote(
    @Param() params: UpdateSecureNoteRequestParamsDto,
    @Body() body: UpdateSecureNoteRequestBodyDto,
  ): Promise<void> {
    return this.updateSecureNoteUsecase.execute({
      id: params.id,
      note: body.note,
    });
  }
}

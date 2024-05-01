import { validate } from 'class-validator';
import { v4 as uuidV4 } from 'uuid';
import { UpdateSecureNoteRequestParamsDto } from './update-secure-note.request.params.dto';

const isNotEmpty = 'id should not be empty';
const isUuid = 'id must be a UUID';

describe('UpdateSecureNoteRequestParamsDto', () => {
  describe('success scenarios', () => {
    it('should not have error if id is a valid uuid', async () => {
      const params = new UpdateSecureNoteRequestParamsDto();
      params.id = uuidV4();

      const errors = await validate(params);

      expect(errors).toHaveLength(0);
    });
  });

  describe('error scenarios', () => {
    it.each([
      { id: null, expectedError: { isNotEmpty, isUuid } },
      { id: undefined, expectedError: { isNotEmpty, isUuid } },
      { id: '', expectedError: { isNotEmpty, isUuid } },
      { id: 'invalid-id', expectedError: { isUuid } },
      { id: 1, expectedError: { isUuid } },
      { id: true, expectedError: { isUuid } },
    ])(
      'should have validation error: $expectedError if id = `$id`',
      async ({ id, expectedError }) => {
        const params = new UpdateSecureNoteRequestParamsDto();
        params.id = id as string;

        const errors = await validate(params);

        expect(errors).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              value: id,
              property: 'id',
              constraints: expectedError,
            }),
          ]),
        );
      },
    );
  });
});

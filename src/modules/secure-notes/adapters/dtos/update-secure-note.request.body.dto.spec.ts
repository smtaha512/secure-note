import { validate } from 'class-validator';
import { UpdateSecureNoteRequestBodyDto } from './update-secure-note.request.body.dto';

const isNotEmpty = 'note should not be empty';
const isString = 'note must be a string';

describe('UpdateSecureNoteRequestBodyDto', () => {
  describe('success scenarios', () => {
    it('should not have error if note is a valid string', async () => {
      const body = new UpdateSecureNoteRequestBodyDto();
      body.note = 'any string';

      const errors = await validate(body);

      expect(errors).toHaveLength(0);
    });
  });

  describe('error scenarios', () => {
    it.each([
      { note: null, expectedError: { isNotEmpty, isString } },
      { note: undefined, expectedError: { isNotEmpty, isString } },
      { note: '', expectedError: { isNotEmpty } },
      { note: 1, expectedError: { isString } },
      { note: true, expectedError: { isString } },
    ])(
      'should have validation error: $expectedError if note = `$note`',
      async ({ note, expectedError }) => {
        const body = new UpdateSecureNoteRequestBodyDto();
        body.note = note as string;

        const errors = await validate(body);

        expect(errors).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              value: note,
              property: 'note',
              constraints: expectedError,
            }),
          ]),
        );
      },
    );
  });
});

import { validate } from 'class-validator';
import { SecureNoteCrypticState } from '../../domain/secure-note';
import { FetchSecureNoteRequestQueryDto } from './fetch-secure-note.request.query.dto';

const isString = 'mode must be a string';
const isIn = 'mode must be one of the following values: encrypted, decrypted';

describe('FetchSecureNoteRequestQueryDto', () => {
  describe('success scenarios', () => {
    it.each([['encrypted'], ['decrypted']])(
      'should not have error if mode = `%s`',
      async (mode) => {
        const params = new FetchSecureNoteRequestQueryDto();
        params.mode = mode as 'encrypted' | 'decrypted';

        const errors = await validate(params);

        expect(errors).toHaveLength(0);
      },
    );
  });

  describe('error scenarios', () => {
    it.each([
      { mode: null, expectedError: { isString, isIn } },
      { mode: undefined, expectedError: { isString, isIn } },
      { mode: '', expectedError: { isIn } },
      { mode: 'invalid-string', expectedError: { isIn } },
      { mode: 1, expectedError: { isString, isIn } },
      { mode: true, expectedError: { isString, isIn } },
    ])(
      'should have validation error: $expectedError if mode = `$mode`',
      async ({ mode, expectedError }) => {
        const params = new FetchSecureNoteRequestQueryDto();
        params.mode = mode as SecureNoteCrypticState;

        const errors = await validate(params);

        expect(errors).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              value: mode,
              property: 'mode',
              constraints: expectedError,
            }),
          ]),
        );
      },
    );
  });
});

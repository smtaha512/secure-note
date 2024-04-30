import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { Crypto } from './crypto';

@Injectable()
export class CryptoService implements Crypto {
  private readonly algorithm = 'aes-256-cbc';
  private readonly ivLength = 16;

  private readonly separator = ':';

  encrypt(textToEncrypt: string, key: Buffer) {
    const iv = randomBytes(this.ivLength);

    const cipher = createCipheriv(this.algorithm, key, iv);

    let encrypted = cipher.update(textToEncrypt);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv
      .toString('hex')
      .concat(this.separator)
      .concat(encrypted.toString('hex'));
  }

  decrypt(textToDecrypt: string, key: Buffer) {
    const [iv, encryptedText] = textToDecrypt
      .split(this.separator)
      .map((part) => Buffer.from(part, 'hex'));

    const decipher = createDecipheriv(this.algorithm, key, iv);

    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }
}

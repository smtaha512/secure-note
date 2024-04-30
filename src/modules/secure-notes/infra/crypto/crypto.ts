export const CryptoProvider = 'Crypto';

export interface Crypto {
  encrypt(textToEncrypt: string, key: Buffer): string;
  decrypt(textToDecrypt: string, key: Buffer): string;
}

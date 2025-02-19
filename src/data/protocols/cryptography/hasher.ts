export interface Hasher {
  hash(plaintext: string): Promise<string>;
}

export const Hasher = Symbol.for('Hasher');

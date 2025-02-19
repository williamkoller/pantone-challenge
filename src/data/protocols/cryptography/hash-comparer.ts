export interface HashComparer {
  compare(plaintext: string, digest: string): Promise<boolean>;
}

export const HashComparer = Symbol.for('HashComparer');

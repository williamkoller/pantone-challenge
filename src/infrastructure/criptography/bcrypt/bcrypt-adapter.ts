import { Injectable } from '@nestjs/common'
import { HashComparer } from '../../../data/protocols/cryptography/hash-comparer'
import { Hasher } from '../../../data/protocols/cryptography/hasher'
import { compareSync, genSaltSync, hashSync } from 'bcrypt'

@Injectable()
export class BcryptAdapter implements Hasher, HashComparer {
  async hash(plaintext: string): Promise<string> {
    const salt = genSaltSync()
    return hashSync(plaintext, salt)
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    return compareSync(plaintext, digest)
  }
}
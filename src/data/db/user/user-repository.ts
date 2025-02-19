import { Readable } from 'node:stream';
import { User } from '../../../domain/user/user';
import { BaseRepository } from '../base-repository';

export interface UserRepository extends BaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findAll(
    limit: number,
    offset: number,
  ): Promise<{ users: User[]; total: number }>;
  findAllStream(limit: number, offset: number): Promise<Readable>;
}

export const UserRepository = Symbol('UserRepository');

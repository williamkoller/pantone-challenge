import { User } from '../../../domain/user/user';
import { BaseRepository } from '../base-repository';

export interface UserRepository extends BaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[] | []>;
}

export const UserRepository = Symbol('UserRepository');

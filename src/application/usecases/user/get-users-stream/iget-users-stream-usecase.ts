import { Readable } from 'node:stream';
import { UseCase } from '../../../../shared/types/usecase';
import { UserMapper } from '../../../mappers/user/user-mapper';

export type Output = ReturnType<typeof UserMapper.toDTO>[];

export type Input = {
  limit: number;
  offset: number;
};

export interface IGetUsersStreamUseCase extends UseCase<Input, Readable> {}

export const IGetUsersStreamUseCase = Symbol('IGetUsersStreamUseCase');

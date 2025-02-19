import { Readable } from 'node:stream';
import { UseCase } from '../../../../shared/types/usecase';
import { UserMapper } from '../../../mappers/user/user-mapper';

export type Output = ReturnType<typeof UserMapper.toDTO>[];

export interface IGetUsersStreamUseCase extends UseCase<void, Readable> {}

export const IGetUsersStreamUseCase = Symbol('IGetUsersStreamUseCase');

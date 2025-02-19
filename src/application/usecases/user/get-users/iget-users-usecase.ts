import { UseCase } from '../../../../shared/types/usecase';
import { UserMapper } from '../../../mappers/user/user-mapper';

export type Input = {
  limit: number;
  offset: number;
};

export type Output = ReturnType<typeof UserMapper.toDTO>[];

export interface IGetUsersUseCase extends UseCase<Input, Output> {}

export const IGetUsersUseCase = Symbol('IGetUsersUseCase');
